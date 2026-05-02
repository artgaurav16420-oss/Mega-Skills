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
    console.log(`Hardening ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    // Normalize to LF for processing
    content = content.replace(/\r\n/g, '\n');

    let lines = content.split('\n');
    let newLines = [];
    let inFence = false;
    let fencePrefix = '';
    let inBlockquote = false;
    let frontmatterEnd = -1;
    let skillName = '';

    // Parse frontmatter
    if (lines[0] === '---') {
        for (let j = 1; j < lines.length; j++) {
            if (lines[j].startsWith('name:')) {
                skillName = lines[j].replace('name:', '').trim();
            }
            if (lines[j] === '---') {
                frontmatterEnd = j;
                break;
            }
        }
    }

    // MD041: Check for H1 after frontmatter (Only for SKILL.md)
    if (path.basename(filePath) === 'SKILL.md') {
        let firstContentLineIndex = frontmatterEnd + 1;
        while (firstContentLineIndex < lines.length && lines[firstContentLineIndex].trim() === '') {
            firstContentLineIndex++;
        }

        if (firstContentLineIndex < lines.length && !lines[firstContentLineIndex].startsWith('# ')) {
            const h1 = `# ${skillName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
            lines.splice(firstContentLineIndex, 0, h1, '');
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let stripped = line.trim();
        let isBlockquoteLine = line.startsWith('>');

        const fenceMatch = line.match(/^(\s*|>+\s*)```(.*)/);
        if (fenceMatch) {
            const prefix = fenceMatch[1];
            const tag = fenceMatch[2].trim();
            if (!inFence) {
                fencePrefix = prefix.includes('>') ? '>' : '';
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push(fencePrefix);
                }
                newLines.push(`${prefix}\`\`\`${tag || 'text'}`);
                inFence = true;
            } else {
                newLines.push(`${prefix}\`\`\``);
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                    newLines.push(fencePrefix);
                }
                inFence = false;
                fencePrefix = '';
            }
            continue;
        }

        if (inFence) {
            if (fencePrefix && !line.startsWith(fencePrefix)) {
                newLines.push(`${fencePrefix} ${line}`);
            } else {
                newLines.push(line);
            }
            continue;
        }

        // MD036 Remediation
        const boldMatch = stripped.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch && !stripped.startsWith('#') && !stripped.startsWith('-')) {
            if (!stripped.match(/^\*\s+/)) { 
                const indent = line.match(/^(\s*)/)[0];
                // Strip trailing punctuation for MD026
                let headingText = boldMatch[1].trim().replace(/[:.!?;]+$/, '');
                
                // MD022: Ensure blank lines around new heading
                if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                    newLines.push('');
                }
                newLines.push(`${indent}#### ${headingText}`);
                if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                    newLines.push('');
                }
                continue;
            }
        }

        if (isBlockquoteLine) {
            inBlockquote = true;
        } else if (stripped === '' && inBlockquote) {
            let foundNext = false;
            for (let k = i + 1; k < lines.length; k++) {
                if (lines[k].trim() !== '') {
                    if (lines[k].startsWith('>')) foundNext = true;
                    break;
                }
            }
            if (foundNext) {
                newLines.push('>');
                continue;
            } else {
                inBlockquote = false;
            }
        } else {
            inBlockquote = false;
        }

        if (line.startsWith('#')) {
            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                newLines.push('');
            }
            newLines.push(line);
            if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                newLines.push('');
            }
            continue;
        }

        const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (orderedMatch) {
            newLines.push(`${orderedMatch[1]}1. ${orderedMatch[3]}`);
            continue;
        }

        newLines.push(line);
    }

    // Post-processing on result string
    let result = newLines.join('\n');

    // MD028: Remove multiple empty blockquote lines
    result = result.replace(/(^>[ \t]*\n){2,}/gm, '>\n');
    
    // MD009: Trailing spaces
    result = result.split('\n').map(line => line.trimEnd()).join('\n');

    // MD033: Inline HTML remediation (specific to details/summary)
    result = result.replace(/<details>\s*<summary>(.*?)<\/summary>/gs, '> **$1**\n>');
    result = result.replace(/<\/details>/g, '');

    // MD026: No trailing punctuation in headings
    result = result.split('\n').map(line => {
        if (line.trim().startsWith('#')) {
            // Only strip if it's not a URL inside a heading (rare but possible)
            return line.replace(/[:.!?;]+$/, '');
        }
        return line;
    }).join('\n');

    // MD001: Heading increment remediation
    let lastLevel = 0;
    result = result.split('\n').map(line => {
        // De-indent headings (MD026/MD001 benefit)
        let processedLine = line;
        if (line.trim().startsWith('#')) {
            processedLine = line.trim();
        }
        
        const headingMatch = processedLine.match(/^(#+)\s/);
        if (headingMatch) {
            let level = headingMatch[1].length;
            if (level > lastLevel + 1 && lastLevel !== 0) {
                level = lastLevel + 1;
                const newHeading = '#'.repeat(level) + processedLine.substring(headingMatch[1].length);
                lastLevel = level;
                return newHeading;
            }
            lastLevel = level;
            return processedLine;
        }
        return line;
    }).join('\n');

    // MD025: Multiple H1s
    let h1Found = false;
    result = result.split('\n').map(line => {
        if (line.match(/^#(\s+|$)/)) {
            if (!h1Found) {
                h1Found = true;
                // If it's an empty H1 (#), we should probably give it a title if it's a SKILL.md
                // but for now just keep it or trim it.
                return line;
            } else {
                // Remove duplicate empty H1s or downgrade them
                if (line.trim() === '#') return ''; 
                return '## ' + line.substring(2);
            }
        }
        return line;
    }).filter(line => line !== null).join('\n');

    // MD060
    result = result.split('\n').map(line => {
        if (line.includes('|') && line.includes('---')) {
            return line.replace(/---/g, ':---');
        }
        return line;
    }).join('\n');

    // MD034
    result = result.split('\n').map(line => {
        if (line.includes('`')) return line;
        return line.replace(/(?<![<\[])(https?:\/\/[^\s>\]]+)(?![>\]])/g, '[$1]($1)');
    }).join('\n');

    result = result.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    // MD024: Duplicate heading remediation
    const headingCounts = new Map();
    result = result.split('\n').map(line => {
        const headingMatch = line.match(/^(#+)\s+(.*)/);
        if (headingMatch) {
            const level = headingMatch[1];
            const content = headingMatch[2].trim();
            const count = headingCounts.get(content) || 0;
            if (count > 0) {
                headingCounts.set(content, count + 1);
                return `${level} ${content} (${count + 1})`;
            }
            headingCounts.set(content, 1);
        }
        return line;
    }).join('\n');

    fs.writeFileSync(filePath, result);
}

const rootDir = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers';
const skills = walk(rootDir);
skills.forEach(fixMarkdown);
console.log(`Successfully mega-hardened v6 ${skills.length} files.`);
