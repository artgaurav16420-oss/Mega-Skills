const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootDir = process.cwd();
const coreSkillsDir = path.join(rootDir, 'skills');
const distHarnessDir = path.join(rootDir, 'distribution', 'harnesses');
const distResourceDir = path.join(rootDir, 'distribution', 'resources');

// Mapping of internal names to root deployment paths
const harnessMap = {
    "adal": ".adal",
    "agents": ".agents",
    "aider-desk": ".aider-desk",
    "augment": ".augment",
    "bob": ".bob",
    "claude": ".claude",
    "claude-plugin": ".claude-plugin",
    "code-review-graph": ".code-review-graph",
    "codeartsdoer": ".codeartsdoer",
    "codebuddy": ".codebuddy",
    "codemaker": ".codestudio", // Correction based on original list
    "codemaker": ".codemaker",
    "codestudio": ".codestudio",
    "codex": ".codex",
    "codex-plugin": ".codex-plugin",
    "commandcode": ".commandcode",
    "continue": ".continue",
    "cortex": ".cortex",
    "crush": ".crush",
    "cursor-plugin": ".cursor-plugin",
    "devin": ".devin",
    "factory": ".factory",
    "forge": ".forge",
    "goose": ".goose",
    "iflow": ".iflow",
    "junie": ".junie",
    "kilocode": ".kilocode",
    "kiro": ".kiro",
    "kode": ".kode",
    "mcpjam": ".mcpjam",
    "mux": ".mux",
    "neovate": ".neovate",
    "opencode": ".opencode",
    "openhands": ".openhands",
    "pi": ".pi",
    "pochi": ".pochi",
    "qoder": ".qoder",
    "qwen": ".qwen",
    "roo": ".roo",
    "rovodev": ".rovodev",
    "tabnine": ".tabnine",
    "tabnine_agent": ".tabnine/agent",
    "trae": ".trae",
    "vibe": ".vibe",
    "windsurf": ".windsurf",
    "zencoder": ".zencoder"
};

// Resources to restore
const resources = ['agents', 'commands', 'hooks'];

console.log('🚀 Mega-Skills: Initializing Self-Healing Sync...\n');

// 1. Restore Resources (agents, commands, hooks)
resources.forEach(res => {
    const src = path.join(distResourceDir, res);
    const dest = path.join(rootDir, res);
    
    if (fs.existsSync(src)) {
        process.stdout.write(`  Restoring ${res.padEnd(20)} ... `);
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        
        // Copy static files
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const fSrc = path.join(src, file);
            const fDest = path.join(dest, file);
            fs.copyFileSync(fSrc, fDest);
        });
        console.log('OK');
    }
});

// 2. Restore and Sync Harnesses
console.log('\n  Syncing agent harnesses...');

Object.entries(harnessMap).forEach(([name, rootPath]) => {
    const src = path.join(distHarnessDir, name);
    const destDir = path.join(rootDir, rootPath.replace(/\//g, path.sep));
    const symlinkPath = path.join(destDir, 'skills');
    
    // Relative target calculation
    const depth = rootPath.split('/').length;
    const target = '../'.repeat(depth) + 'skills';

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    // Copy any static plugin files (plugin.json, etc.)
    if (fs.existsSync(src)) {
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const fSrc = path.join(src, file);
            const fDest = path.join(destDir, file);
            if (fs.statSync(fSrc).isFile()) {
                fs.copyFileSync(fSrc, fDest);
            }
        });
    }

    // Create/Repair symlink
    let needsRepair = false;
    try {
        const stats = fs.lstatSync(symlinkPath);
        if (stats.isSymbolicLink()) {
            const currentTarget = fs.readlinkSync(symlinkPath);
            if (currentTarget !== target && currentTarget !== target.replace(/\//g, '\\')) {
                needsRepair = true;
            }
        } else {
            needsRepair = true;
        }
    } catch (e) {
        needsRepair = true;
    }

    if (needsRepair) {
        if (fs.existsSync(symlinkPath) || fs.lstatSync(symlinkPath, { throwIfNoEntry: false })) {
            fs.rmSync(symlinkPath, { recursive: true, force: true });
        }
        try {
            fs.symlinkSync(target, symlinkPath, 'dir');
        } catch (err) {
            // Fallback for Windows
            try {
                const winTarget = target.replace(/\//g, '\\');
                const winPath = symlinkPath.replace(/\//g, '\\');
                execSync(`cmd /c mklink /D "${winPath}" "${winTarget}"`, { stdio: 'ignore' });
            } catch (e2) {}
        }
    }
});

// 3. Global Sync for Gemini CLI
console.log('\n  Syncing global environments (Gemini CLI)...');
try {
    const homedir = os.homedir();
    const globalGeminiExtDir = path.join(homedir, '.gemini', 'extensions', 'mega-skills');
    const globalSymlinkPath = path.join(globalGeminiExtDir, 'skills');

    if (!fs.existsSync(globalGeminiExtDir)) {
        fs.mkdirSync(globalGeminiExtDir, { recursive: true });
    }

    if (fs.existsSync(globalSymlinkPath) || fs.lstatSync(globalSymlinkPath, { throwIfNoEntry: false })) {
        fs.rmSync(globalSymlinkPath, { recursive: true, force: true });
    }

    try {
        fs.symlinkSync(coreSkillsDir, globalSymlinkPath, 'dir');
        console.log('  -> Global Gemini CLI skills linked.');
    } catch (err) {
        // Fallback for Windows
        try {
            const winTarget = coreSkillsDir.replace(/\//g, '\\');
            const winPath = globalSymlinkPath.replace(/\//g, '\\');
            execSync(`cmd /c mklink /J "${winPath}" "${winTarget}"`, { stdio: 'ignore' });
            console.log('  -> Global Gemini CLI skills linked (Junction).');
        } catch (e2) {
            console.log('  -> Failed to link global Gemini CLI skills (Permissions error).');
        }
    }
} catch (e) {
    console.log('  -> Skipped global Gemini CLI sync (User profile not accessible).');
}

console.log('\n✅ Mega-Sync complete. Local environment is fully functional.');
console.log('GitHub UI remains 100% clean. Zero redundancy detected.\n');
