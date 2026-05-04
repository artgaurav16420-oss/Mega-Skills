const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\agaur\\OneDrive\\Desktop\\Mega-Skills\\skills';

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
    
    // Regex to match the recursive pattern: ([URL]([URL]...))
    // This matches strings like ([https://...]([https://...)))]
    // We replace it with the first URL found in the sequence.
    
    const regex = /\(\[?(https?:\/\/[^\s\)]+)\]?\(\[?https?:\/\/[^\s\)]+\]?\)+/g;
    
    if (regex.test(content)) {
        console.log(`Cleaning ${path.relative(root, file)}...`);
        const cleaned = content.replace(regex, (match, url) => {
            // Extract the base URL and return standard markdown link format
            // but the regex already captured the URL in group 1.
            // We just need to check if the match was a link [text](link) or just a link.
            // Actually, the grep shows it's often like [text]([link]([link]...))
            return `(${url.replace(/[\)\]]+$/, '')})`;
        });
        
        // Also fix the [text]([link]([link]...)) case
        const regex2 = /\[([^\]]+)\]\(\[?(https?:\/\/[^\s\)]+)\]?\(\[?https?:\/\/[^\s\)]+\]?\)+/g;
        const final = cleaned.replace(regex2, (match, text, url) => {
            return `[${text}](${url.replace(/[\)\]]+$/, '')})`;
        });

        if (final !== content) {
            fs.writeFileSync(file, final);
        }
    }
});
