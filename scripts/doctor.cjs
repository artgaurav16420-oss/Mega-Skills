const { execSync } = require('child_process');
const chalk = {
    green: (t) => `\x1b[32m${t}\x1b[0m`,
    red: (t) => `\x1b[31m${t}\x1b[0m`,
    yellow: (t) => `\x1b[33m${t}\x1b[0m`,
    blue: (t) => `\x1b[34m${t}\x1b[0m`,
    bold: (t) => `\x1b[1m${t}\x1b[0m`
};

const checks = [
    { name: 'Node.js', cmd: 'node --version', required: true, skill: 'Core CLI' },
    { name: 'Git', cmd: 'git --version', required: true, skill: 'Core Repo' },
    { name: 'Python 3', cmd: 'python --version || python3 --version', required: false, skill: 'xlsx, pdf, docx' },
    { name: 'LibreOffice (soffice)', cmd: 'soffice --version || "C:\\Program Files\\LibreOffice\\program\\soffice.exe" --version', required: false, skill: 'xlsx, high-fidelity-pptx' },
    { name: 'Pandoc', cmd: 'pandoc --version', required: false, skill: 'docx, pdf' },
    { name: 'GCC / Compiler', cmd: 'gcc --version || clang --version', required: false, skill: 'xlsx (LD_PRELOAD shim)' },
    { name: 'Terraform / OpenTofu', cmd: 'terraform --version || tofu --version', required: false, skill: 'infrastructure-as-code' },
    { name: 'Marp CLI', cmd: 'marp --version', required: false, skill: 'high-fidelity-pptx' }
];

console.log(chalk.bold('\n⚕️ Mega-Skills Doctor — System Diagnostic\n'));
console.log('Checking dependencies for "Beast Mode" skills...\n');

let missingCount = 0;

checks.forEach(check => {
    process.stdout.write(`  Checking ${chalk.bold(check.name.padEnd(20))} ... `);
    try {
        const output = execSync(check.cmd, { stdio: 'pipe' }).toString().split('\n')[0].trim();
        console.log(`${chalk.green('PASS')} (${output})`);
    } catch (e) {
        if (check.required) {
            console.log(chalk.red('FAIL'));
            console.log(`    ${chalk.red('Critical Error:')} This is required for Mega-Skills to function.`);
            missingCount++;
        } else {
            console.log(chalk.yellow('MISSING'));
            console.log(`    ${chalk.blue('Note:')} Affects skills: [${check.skill}]`);
        }
    }
});

console.log('\n' + '─'.repeat(50));

if (missingCount === 0) {
    console.log(`\n${chalk.green('✔')} ${chalk.bold('System is healthy.')} Most Beast Mode skills will work out-of-the-box.`);
    console.log(`  If some skills fail, ensure the 'MISSING' optional tools above are installed.`);
} else {
    console.log(`\n${chalk.red('✘')} ${chalk.bold('System has critical issues.')} Please install required tools listed above.`);
}

console.log('\nRun ' + chalk.blue('npx mega-skills sync') + ' after fixing dependencies to repair harnesses.\n');
