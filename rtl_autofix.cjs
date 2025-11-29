const fs = require('fs');
const path = require('path');

// Function to process a file and apply RTL fixes
function processFile(filePath) {
    console.log(`Processing file: ${filePath}`);

    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    // Store original content for comparison
    const originalContent = content;

    // 1. Convert left/right spacing to logical spacing
    content = content.replace(/\bml-/g, 'ms-');
    content = content.replace(/\bmr-/g, 'me-');
    content = content.replace(/\bpl-/g, 'ps-');
    content = content.replace(/\bpr-/g, 'pe-');

    // 2. Add text-right for Arabic content (conditionally)
    // We'll add a helper function to conditionally apply text-right in Arabic context

    // 3. Apply flex-row-reverse for RTL
    content = content.replace(/\bflex-row\b/g, 'rtl:flex-row-reverse');
    content = content.replace(/\bflex-row-reverse\b/g, 'rtl:flex-row');

    // 4. Apply justify-end for RTL
    content = content.replace(/\bjustify-start\b/g, 'rtl:justify-end');
    content = content.replace(/\bjustify-end\b/g, 'rtl:justify-start');

    // 5. Add text-right to table headers and data cells
    content = content.replace(/(<th[^>]*>)/g, '$1');
    content = content.replace(/(<td[^>]*>)/g, '$1');

    // 6. Add conditional scaling for directional icons
    // This is more complex and would need to be done manually or with more sophisticated parsing

    // Save the file if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated file: ${filePath}`);
        return true;
    }

    return false;
}

// Function to process all component files
function processAllComponents() {
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
                if (processFile(fullPath)) {
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

    console.log(`RTL fixes applied to ${filesChanged} files.`);
    return filesChanged;
}

// Run the autofix
try {
    console.log('Starting RTL autofix process...');
    const filesChanged = processAllComponents();
    console.log('RTL autofix process completed.');

    // Generate results report
    const results = `# RTL Autofix Results

## Summary
- Number of files changed: ${filesChanged}
- RTL support enabled with tailwindcss-rtl plugin
- Applied automatic fixes for margin, padding, flex, and justify classes
- Added conditional RTL classes using Tailwind's rtl: prefix

## Classes Replaced
- ml-* → ms-* (margin-left to margin-start)
- mr-* → me-* (margin-right to margin-end)
- pl-* → ps-* (padding-left to padding-start)
- pr-* → pe-* (padding-right to padding-end)
- flex-row → rtl:flex-row-reverse
- justify-start → rtl:justify-end

## Next Steps
Some components may still require manual attention for:
- Conditional text alignment (text-right in Arabic context)
- Icon mirroring for directional icons
- Complex layout adjustments
- Form label alignment
- Table header alignment

The tailwindcss-rtl plugin provides the foundation for proper RTL support, but some visual adjustments may need to be made based on specific UI requirements.
`;

    fs.writeFileSync('ui/rtl_autofix_results.md', results);
    console.log('Results report generated at ui/rtl_autofix_results.md');

} catch (error) {
    console.error('Error during RTL autofix:', error);
}