// lib/orchestrator.cjs

import { readFile } from 'fs/promises';
import { pipeline } from '@xenova/transformers';
import path from 'path';

// Function to calculate cosine similarity between two arrays
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magA += vecA[i] * vecA[i];
        magB += vecB[i] * vecB[i];
    }
    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    if (magA === 0 || magB === 0) {
        return 0;
    }
    return dotProduct / (magA * magB);
}

class SkillOrchestrator {
    constructor() {
        this.skillIndex = null;
        this.extractor = null;
    }

    async init() {
        // 1. Load the skill index
        const indexPath = this.resolveIndexPath();
        console.log(`Loading skill index from ${indexPath}`);
        try {
            const indexJson = await readFile(indexPath, 'utf-8');
            this.skillIndex = JSON.parse(indexJson);
            console.log(`Loaded ${this.skillIndex.length} skills into orchestrator.`);
        } catch (error) {
            console.log('Skill index not found. Generating semantic map for the first time...');
            try {
                const { spawnSync } = await import('child_process');
                const indexScript = path.join(process.cwd(), 'scripts', 'index_skills.cjs');
                const result = spawnSync('node', [indexScript], { stdio: 'inherit' });
                if (result.status !== 0) {
                    throw new Error(`Indexing failed with status ${result.status}`);
                }
                // Retry loading after auto-index
                const retryIndexJson = await readFile(indexPath, 'utf-8');
                this.skillIndex = JSON.parse(retryIndexJson);
                console.log(`Successfully auto-indexed and loaded ${this.skillIndex.length} skills.`);
            } catch (indexError) {
                console.error('Auto-indexing failed:', indexError);
                console.error('Please run "npx mega-skills index-skills" manually.');
                process.exit(1);
            }
        }

        // 2. Initialize the feature extractor
        console.log('Initializing feature extractor...');
        this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log('Orchestrator initialized successfully.');
    }

    resolveIndexPath() {
        let currentDir = process.cwd();
        while (currentDir !== path.parse(currentDir).root) {
            const potentialPath = path.join(currentDir, 'skill_index.json');
            if (require('fs').existsSync(potentialPath)) {
                return potentialPath;
            }
            currentDir = path.dirname(currentDir);
        }
        return path.join(process.cwd(), 'skill_index.json');
    }

    async getBestSkill(prompt, topK = 3) {
        if (!this.skillIndex || !this.extractor) {
            throw new Error('Orchestrator not initialized. Please call init() first.');
        }

        // 1. Generate embedding for the user's prompt
        console.log(`
Finding best skill for prompt: "${prompt}"`);
        const { data: promptEmbedding } = await this.extractor(prompt, {
            pooling: 'mean',
            normalize: true,
        });
        const promptEmbeddingArray = Array.from(promptEmbedding);

        // 2. Calculate similarity scores
        const skillsWithScores = this.skillIndex.map(skill => {
            const similarity = cosineSimilarity(promptEmbeddingArray, skill.embedding);
            return { ...skill, score: similarity };
        });

        // 3. Sort by score and return the top K
        skillsWithScores.sort((a, b) => b.score - a.score);
        return skillsWithScores.slice(0, topK);
    }
}

// Export a singleton instance
const orchestrator = new SkillOrchestrator();

export default orchestrator;
