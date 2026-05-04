const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = process.cwd();
const distHarnessDir = path.join(rootDir, 'distribution', 'harnesses');
const distResourceDir = path.join(rootDir, 'distribution', 'resources');

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

// 1. Move Agents and Commands
['agents', 'commands', 'hooks'].forEach(dir => {
    const src = path.join(rootDir, dir);
    if (fs.existsSync(src)) {
        console.log(`Moving ${dir} to resources...`);
        // Use recursive copy because rename fails across devices or if files are open
        execSync(`powershell -Command "Copy-Item -Path ${dir} -Destination distribution/resources -Recurse -Force"`);
        execSync(`git rm -r ${dir}`);
    }
});

// 2. Move Harnesses
harnesses.forEach(h => {
    const src = path.join(rootDir, h);
    if (fs.existsSync(src)) {
        // Create matching dir in distribution/harnesses (strip leading dot for clarity)
        const name = h.replace(/^\./, '').replace(/\//g, '_');
        const dest = path.join(distHarnessDir, name);
        
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        
        console.log(`Consolidating ${h} -> distribution/harnesses/${name}`);
        
        // Copy everything EXCEPT the skills symlink
        const entries = fs.readdirSync(src);
        entries.forEach(entry => {
            if (entry === 'skills') return;
            const entryPath = path.join(src, entry);
            execSync(`powershell -Command "Copy-Item -Path '${entryPath}' -Destination distribution/harnesses/${name} -Recurse -Force"`);
        });
        
        // Remove from root via git
        execSync(`git rm -r ${h}`);
    }
});

// 3. Clean up scratch
if (fs.existsSync(path.join(rootDir, 'scratch'))) {
    execSync(`git rm -r scratch`);
}

console.log('Consolidation complete.');
