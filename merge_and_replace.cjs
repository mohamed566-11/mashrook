const fs = require('fs');
const path = require('path');

// Read the existing translation files
const existingEn = JSON.parse(fs.readFileSync('translations/en.json', 'utf8'));
const existingAr = JSON.parse(fs.readFileSync('translations/ar.json', 'utf8'));

// Read the new translation files
const newUserTextEn = JSON.parse(fs.readFileSync('translations/user_text_en.json', 'utf8'));
const newUserTextAr = JSON.parse(fs.readFileSync('translations/user_text_ar.json', 'utf8'));

// Merge the translations
const mergedEn = { ...existingEn, ...newUserTextEn };
const mergedAr = { ...existingAr, ...newUserTextAr };

// Write the merged translation files
fs.writeFileSync('translations/en.json', JSON.stringify(mergedEn, null, 2));
fs.writeFileSync('translations/ar.json', JSON.stringify(mergedAr, null, 2));

console.log('Translation files merged successfully.');

// Now we need to replace the hardcoded strings in the code files
// Read the user-facing strings to know what to replace
const userFacingStrings = JSON.parse(fs.readFileSync('translations/untranslated_user_text.json', 'utf8'));

// Group strings by file for efficient replacement
const stringsByFile = {};
userFacingStrings.forEach(item => {
    if (!stringsByFile[item.file]) {
        stringsByFile[item.file] = [];
    }
    stringsByFile[item.file].push(item);
});

// Function to determine if we're in a frontend or backend file
function isFrontendFile(filePath) {
    return filePath.endsWith('.tsx') || filePath.endsWith('.ts') ||
        filePath.endsWith('.jsx') || filePath.endsWith('.js');
}

// Function to escape special characters in regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Process each file
for (const filePath in stringsByFile) {
    const fullPath = path.join('.', filePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${fullPath}`);
        continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const strings = stringsByFile[filePath];

    // Sort strings by position (line number) in descending order to avoid offset issues
    strings.sort((a, b) => b.line - a.line);

    // Replace each string
    for (const item of strings) {
        const { text, suggestedKey } = item;

        // Escape special characters in the text for regex
        const escapedText = escapeRegex(text);

        // Create the replacement text
        const replacement = isFrontendFile(filePath)
            ? `t("${suggestedKey}")`
            : `_localizer["${suggestedKey}"]`;

        // Replace the text in the content
        // We need to be careful to only replace text that's not already in a translation function
        const regex = new RegExp(`(?<!t\\s*\\(\\s*["'])${escapedText}(?!["']\\s*\\))`, 'g');
        content = content.replace(regex, replacement);
    }

    // Write the updated content back to the file
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${filePath}`);
}

console.log('Code replacement completed.');