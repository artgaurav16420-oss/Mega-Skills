// scripts/index_skills.cjs

import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';
import { pipeline } from '@xenova/transformers';
import path from 'path';

async function main() {
    // 1. Find all SKILL.md files
    console.log('Searching for skill files...');
    const skillFiles = await glob('skills/**/SKILL.md', { absolute: true });
    console.log(`Found ${skillFiles.length} skill files.`);

    // 2. Create a function to parse the YAML frontmatter
    // Using simple regex to avoid adding a new dependency for YAML parsing.
    function parseFrontmatter(content) {
        const match = content.match(/---([\s\S]*?)---/);
        if (!match) return {};

        const frontmatter = match[1];
        const nameMatch = frontmatter.match(/name:\s*(.*)/);
        const descMatch = frontmatter.match(/description:\s*([\s\S]*?)(?=
\w+:|$)/);

        const description = descMatch ? descMatch[1].replace(/
\s*/g, ' ').trim() : 'No description.';

        return {
            name: nameMatch ? nameMatch[1].trim() : null,
            description: description,
        };
    }

    // 3. Process each skill file
    const skills = [];
    for (const file of skillFiles) {
        const content = await readFile(file, 'utf-8');
        const { name, description } = parseFrontmatter(content);
        if (name) {
            skills.push({ name, description, path: file });
        } else {
            console.warn(`- Skipping file (no name found): ${file}`);
        }
    }
    console.log(`Successfully parsed ${skills.length} skills.`);

    // 4. Generate embeddings
    console.log('
Generating embeddings... This may take a few minutes on first run.');
    // The model will be downloaded automatically and cached for future use.
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    const skillsWithEmbeddings = [];
    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        console.log(`- Generating embedding for "${skill.name}" (${i + 1}/${skills.length})`);
        const { data: embedding } = await extractor(skill.description, {
            pooling: 'mean',
            normalize: true,
        });

        skillsWithEmbeddings.push({
            name: skill.name,
            description: skill.description,
            path: skill.path,
            embedding: Array.from(embedding),
        });
    }

    // 5. Save the index
    const indexPath = path.join(process.cwd(), 'skill_index.json');
    await writeFile(indexPath, JSON.stringify(skillsWithEmbeddings, null, 2));

    console.log(`
✅ Skill index created successfully!`);
    console.log(`   - Location: ${indexPath}`);
    console.log(`   - Indexed ${skillsWithEmbeddings.length} skills.`);
}

main().catch(console.error);
