const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const skillsDir = path.join(rootDir, 'skills');

// Extended list of harnesses to match sync_skills.cjs coverage
const harnesses = [
    ".adal", ".agents", ".aider-desk", ".augment", ".bob",
    ".claude", ".claude-plugin", ".code-review-graph", ".codeartsdoer",
    ".codebuddy", ".codemaker", ".codestudio", ".codex",
    ".codex-plugin", ".commandcode", ".continue", ".cortex",
    ".crush", ".cursor-plugin", ".devin", ".factory",
    ".forge", ".goose", ".iflow", ".junie", ".kilocode",
    ".kiro", ".kode", ".mcpjam", ".mux", ".neovate",
    ".opencode", ".openhands", ".pi", ".pochi", ".qoder",
    ".qwen", ".roo", ".rovodev", ".tabnine", ".tabnine/agent",
    ".trae", ".vibe", ".windsurf", ".zencoder"
];

if (!fs.existsSync(skillsDir)) {
    console.error(`Error: Skills directory not found at ${skillsDir}`);
    process.exit(1);
}

const skills = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

let issues = 0;

console.log(`Checking ${skills.length} skills across ${harnesses.length} harnesses...\n`);

skills.forEach(skill => {
    const skillPath = path.join(skillsDir, skill);
    const mdPath = path.join(skillPath, 'SKILL.md');
    
    if (!fs.existsSync(mdPath)) {
        console.error(`[MISSING SKILL.md] ${skill}`);
        issues++;
    }
});

// Check harness synchronization/symlink health
harnesses.forEach(h => {
    const hSkillsDir = path.join(rootDir, h, 'skills');
    if (fs.existsSync(hSkillsDir)) {
        try {
            const stats = fs.lstatSync(hSkillsDir);
            if (!stats.isSymbolicLink() && h !== 'skills') {
                // If it's a physical directory instead of a symlink, check completion
                const hSkills = fs.readdirSync(hSkillsDir);
                if (hSkills.length < skills.length) {
                    console.warn(`[INCOMPLETE HARNESS] ${h} is a physical directory with only ${hSkills.length}/${skills.length} skills.`);
                    issues++;
                }
            }
        } catch (e) {
            // Path exists but could not be stat-ed
        }
    }
});

if (issues === 0) {
    console.log('\n✅ All skills are complete and structurally synchronized.');
} else {
    console.log(`\n❌ Found ${issues} issues.`);
    process.exit(1);
}
