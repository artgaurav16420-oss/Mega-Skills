const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Superpowers\\skills';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (file.toLowerCase().endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = walk(root);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Pattern 1: [text]([url]([url]...))
    // We want to capture the 'text' and the 'url'
    const recursiveLinkRegex = /\[([^\]]+)\]\((?:\[?(https?:\/\/[^\s\)]+?)\]?\(?)+/g;
    
    let newContent = content.replace(recursiveLinkRegex, (match, text, url) => {
        changed = true;
        return `[${text}](${url})`;
    });

    // Pattern 2: ([url]([url]...))
    const recursiveBareRegex = /\((?:\[?(https?:\/\/[^\s\)]+?)\]?\(?)+/g;
    newContent = newContent.replace(recursiveBareRegex, (match, url) => {
        // Only replace if it actually looks like a recursive mess (contains multiple http or many parens)
        if (match.split('http').length > 2 || match.includes('))')) {
            changed = true;
            return `(${url})`;
        }
        return match;
    });
    
    // Pattern 3: src="[url]([url]...)"
    const recursiveSrcRegex = /src="\[?(https?:\/\/[^\s\)]+?)\]?\(?(?:\[?https?:\/\/[^\s\)]+?\]?\(?)+/g;
    newContent = newContent.replace(recursiveSrcRegex, (match, url) => {
        changed = true;
        return `src="${url}"`;
    });

    // Final cleanup of any trailing artifacts like ))))))))
    // This is risky but these files are clearly broken.
    // We only do this if we detected a change above.
    if (changed) {
        // Clean up unmatched closing parens after a URL fix
        // [text](url)))))) -> [text](url)
        newContent = newContent.replace(/(\(https?:\/\/[^\s\)]+\))\)+/g, '$1');
        
        console.log(`Cleaned ${path.relative(root, file)}`);
        fs.writeFileSync(file, newContent);
    }
});
