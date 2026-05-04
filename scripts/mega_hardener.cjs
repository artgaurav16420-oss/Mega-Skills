const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                results = results.concat(walk(filePath));
            }
        } else if (file.toLowerCase().endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

function fixMarkdown(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split(/\r?\n/);
    let newLines = [];
    let inFence = false;
    let fencePrefix = '';
    let frontmatterEnd = -1;
    let skillName = '';
    
    let lastLevel = 0;
    const headingCounts = new Map();
    let h1Found = false;

    if (lines[0] === '---') {
        for (let j = 1; j < lines.length; j++) {
            if (lines[j].startsWith('name:')) skillName = lines[j].replace('name:', '').trim();
            if (lines[j] === '---') { frontmatterEnd = j; break; }
        }
    }

    if (path.basename(filePath) === 'SKILL.md') {
        let firstContentLineIndex = frontmatterEnd + 1;
        while (firstContentLineIndex < lines.length && lines[firstContentLineIndex].trim() === '') firstContentLineIndex++;
        if (firstContentLineIndex < lines.length && !lines[firstContentLineIndex].trim().startsWith('# ')) {
            const h1 = `# ${skillName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
            lines.splice(firstContentLineIndex, 0, h1, '');
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();

        // MD031/MD040: Fences
        const fenceMatch = line.match(/^(\s*|>+\s*)```(.*)/);
        if (fenceMatch) {
            const tag = fenceMatch[2].trim();
            if (!inFence) {
                // MD031: Blank line before
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') newLines.push('');
                newLines.push(`\`\`\`${tag || 'text'}`);
                inFence = true;
            } else {
                newLines.push('```');
                // MD031: Blank line after
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') newLines.push('');
                inFence = false;
            }
            continue;
        }

        if (inFence) {
            newLines.push(line);
            continue;
        }

        // --- OUTSIDE FENCE ---
        line = line.trimEnd();

        // MD022: Heading padding
        if (stripped.startsWith('#')) {
            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') newLines.push('');
            
            let processedLine = stripped.replace(/[:.!?;]+$/, '');
            const headingMatch = processedLine.match(/^(#+)(\s+|$)/);
            if (headingMatch) {
                let level = headingMatch[1].length;
                let contentText = processedLine.substring(headingMatch[1].length).trim();

                if (level === 1) { if (h1Found) level = 2; else h1Found = true; }
                if (level > lastLevel + 1 && lastLevel !== 0) level = lastLevel + 1;
                lastLevel = level;

                const count = headingCounts.get(contentText) || 0;
                if (count > 0 && level > 1) {
                    headingCounts.set(contentText, count + 1);
                    contentText = `${contentText} (${count + 1})`;
                } else {
                    headingCounts.set(contentText, 1);
                }

                newLines.push(`${'#'.repeat(level)} ${contentText}`);
                if (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].trim().startsWith('#')) newLines.push('');
                continue;
            }
        }

        // MD034: Bare URLs
        if (!line.includes('`')) line = line.replace(/(?<![<\[])(https?:\/\/[^\s>\]]+)(?![>\]])/g, '[$1]($1)');

    // MD033: details/summary
    if (line.includes('<details>') && line.includes('<summary>')) {
        line = line.replace(/<details>\s*<summary>(.*?)<\/summary>/gs, '> **$1**\n>');
    }
    line = line.replace(/<\/details>/g, '');

    // MD033: Wrap <placeholder> in backticks to avoid HTML trigger
    line = line.replace(/(?<![`])<([a-zA-Z0-9_-]+)>(?![`])/g, '`<$1>`');

        // MD007/MD060: List Normalization
        const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)/);
        if (listMatch) {
            let indent = listMatch[1];
            const listContent = listMatch[3];
            
            // Normalize indent: 0 for top, 3 for level 1 child, 6 for level 2
            if (indent.length === 0) indent = ''; 
            else if (indent.length < 5) indent = '   ';
            else indent = '      ';

            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '' && !newLines[newLines.length - 1].trim().match(/^([-*+]|\d+\.)\s+/)) {
                newLines.push('');
            }

            newLines.push(`${indent}1. ${listContent}`);
            continue;
        }

        newLines.push(line);
    }

    let finalResult = newLines.join('\n');
    finalResult = finalResult.split('\n').map(line => {
        if (line.includes('|') && line.includes('---')) return line.replace(/---/g, ':---');
        return line;
    }).join('\n');

    finalResult = finalResult.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    fs.writeFileSync(filePath, finalResult);
}

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Mega-Skills';
const skills = walk(rootDir);
skills.forEach(fixMarkdown);
console.log(`Successfully mega-hardened v6 (v8 Ultra-Clean) ${skills.length} files.`);
