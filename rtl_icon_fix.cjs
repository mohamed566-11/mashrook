const fs = require('fs');
const path = require('path');

// List of directional icons that need to be mirrored in RTL
const directionalIcons = [
    'ArrowLeft',
    'ArrowRight',
    'ChevronLeft',
    'ChevronRight',
    'ChevronUp',
    'ChevronDown',
    'Menu',
    'MoreHorizontal',
    'MoreVertical'
];

// Function to add RTL mirroring to directional icons
function addIconRTLTransform(filePath) {
    console.log(`Processing icons in file: ${filePath}`);

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Look for directional icons and add conditional scaling
    directionalIcons.forEach(iconName => {
        const iconRegex = new RegExp(`(<${iconName}[^>]*className=[^>]*)`, 'g');
        content = content.replace(iconRegex, `$1 {\`language === 'ar' && 'scale-x-[-1]'\`} `);
    });

    // Also look for icons with existing className and add the conditional scaling
    const iconWithClassRegex = /(<([A-Za-z]+Icon|Arrow[A-Za-z]*|Chevron[A-Za-z]*)[^>]*className=["'][^>]*>)/g;
    content = content.replace(iconWithClassRegex, (match, fullTag, iconName) => {
        if (directionalIcons.includes(iconName)) {
            // Check if it already has conditional logic
            if (!match.includes('scale-x-[-1]')) {
                // Insert the RTL scaling condition
                return fullTag.replace(/className=(["'])([^"']*)["']/, `className={$2 + (language === 'ar' ? ' scale-x-[-1]' : '')}`);
            }
        }
        return match;
    });

    // Save if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated icons in file: ${filePath}`);
        return true;
    }

    return false;
}

// Function to process all component files for icon fixes
function processIconFixes() {
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
                if (addIconRTLTransform(fullPath)) {
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

    console.log(`Icon RTL fixes applied to ${filesChanged} files.`);
    return filesChanged;
}

// Run the icon fix process
try {
    console.log('Starting RTL icon fix process...');
    const filesChanged = processIconFixes();
    console.log('RTL icon fix process completed.');
} catch (error) {
    console.error('Error during RTL icon fix:', error);
}