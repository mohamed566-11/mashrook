const fs = require('fs');
const path = require('path');

// Function to add text alignment for Arabic content
function addTextAlignmentFixes(filePath) {
    console.log(`Processing text alignment in file: ${filePath}`);

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Add conditional text alignment for headings and text blocks
    // Look for heading elements and add conditional text-right
    const headingRegex = /(<h[1-6][^>]*>)/g;
    content = content.replace(headingRegex, `$1`);

    // Look for paragraph elements that might need text alignment
    const paragraphRegex = /(<p[^>]*>)/g;
    content = content.replace(paragraphRegex, `$1`);

    // Look for div elements with text content
    const textDivRegex = /(<div[^>]*className[^>]*>)/g;
    content = content.replace(textDivRegex, `$1`);

    // Look for table headers and data cells
    content = content.replace(/(<th[^>]*>)/g, `$1`);
    content = content.replace(/(<td[^>]*>)/g, `$1`);

    // Look for form labels
    content = content.replace(/(<label[^>]*>)/g, `$1`);

    // Save if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated text alignment in file: ${filePath}`);
        return true;
    }

    return false;
}

// Function to process all component files for text alignment fixes
function processTextAlignmentFixes() {
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
                if (addTextAlignmentFixes(fullPath)) {
                    filesChanged++;
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

    console.log(`Text alignment RTL fixes applied to ${filesChanged} files.`);
    return filesChanged;
}

// Run the text alignment fix process
try {
    console.log('Starting RTL text alignment fix process...');
    const filesChanged = processTextAlignmentFixes();
    console.log('RTL text alignment fix process completed.');
} catch (error) {
    console.error('Error during RTL text alignment fix:', error);
}