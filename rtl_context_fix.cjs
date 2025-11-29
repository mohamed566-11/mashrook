const fs = require('fs');
const path = require('path');

// Function to add language context imports and usage
function addLanguageContext(filePath) {
    console.log(`Processing language context in file: ${filePath}`);

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Check if the file already has the useLanguage import
    if (!content.includes('useLanguage') && (content.includes('<') && content.includes('className'))) {
        // Add the import statement after the last import
        content = content.replace(
            /import\s+.*from\s+['"][^'"]+['"];\s*$/m,
            `$&\nimport { useLanguage } from '../context/LanguageContext';`
        );

        // Add the language variable declaration in the component
        // Look for the start of the component function
        const componentStartRegex = /(const\s+[A-Za-z]+:\s*React\.FC[^=]*=\s*\([^)]*\)\s*=>\s*{)/;
        if (componentStartRegex.test(content)) {
            content = content.replace(componentStartRegex, `$1\n  const { language } = useLanguage();`);
        } else {
            // Try to find arrow function components
            const arrowFunctionRegex = /([A-Za-z]+:\s*React\.FC[^=]*=\s*\([^)]*\)\s*=>\s*{\s*return\s*\()/;
            if (arrowFunctionRegex.test(content)) {
                content = content.replace(arrowFunctionRegex, `$1\n    const { language } = useLanguage();\n    `);
            }
        }
    }

    // Save if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated language context in file: ${filePath}`);
        return true;
    }

    return false;
}

// Function to process all component files for language context fixes
function processLanguageContextFixes() {
    const componentsDir = path.join('.', 'components');
    const pagesDir = path.join('.', 'pages');

    let filesChanged = 0;

    // Process components directory recursively
    function processDirectory(dirPath) {
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
                // Skip files that already have the LanguageContext import or are context files themselves
                if (!fullPath.includes('LanguageContext') && !fullPath.includes('App.tsx')) {
                    if (addLanguageContext(fullPath)) {
                        filesChanged++;
                    }
                }
            }
        });
    }

    // Process components and pages directories
    if (fs.existsSync(componentsDir)) {
        processDirectory(componentsDir);
    }

    if (fs.existsSync(pagesDir)) {
        processDirectory(pagesDir);
    }

    console.log(`Language context RTL fixes applied to ${filesChanged} files.`);
    return filesChanged;
}

// Run the language context fix process
try {
    console.log('Starting RTL language context fix process...');
    const filesChanged = processLanguageContextFixes();
    console.log('RTL language context fix process completed.');
} catch (error) {
    console.error('Error during RTL language context fix:', error);
}