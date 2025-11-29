const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the untranslated strings file
const untranslatedData = JSON.parse(fs.readFileSync('translations/untranslated_remaining.json', 'utf8'));

// Function to determine if a string is user-facing or technical
function isUserFacingText(item) {
    const { text, file } = item;

    // Obvious technical strings to exclude
    const technicalPatterns = [
        // CSS classes and Tailwind classes
        /^[a-z0-9-]+:[a-z0-9-]+$/,  // CSS properties like text-sm, bg-white
        /^[a-z0-9-]+$/,             // Simple CSS classes
        /bg-([a-z0-9-]+)/,          // Background colors
        /text-([a-z0-9-]+)/,        // Text colors and sizes
        /border-([a-z0-9-]+)/,      // Border classes
        /flex/, /grid/, /items-/, /justify-/, /gap-/, /p-/, /m-/, /w-/, /h-/, // Layout classes
        /rounded/, /shadow/, /font-/, /space-/, // Other common classes

        // HTTP headers and technical values
        /^application\//,           // MIME types
        /^Content-Type$/,           // HTTP headers
        /^https?:\/\//,             // URLs
        /localhost/,                // Hostnames
        /\.css$/, /\.js$/, /\.json$/, // File extensions
        /^[0-9]+px$/,               // CSS units
        /^[0-9]+%$/,                // Percentages
        /^[0-9]+em$/,               // EM units
        /^#[a-fA-F0-9]{3,6}$/,      // Hex colors

        // Programming/technical identifiers
        /^[A-Z_][A-Z0-9_]+$/,       // Constants like URL_PATH
        /{[^}]*}/,                  // Template variables
        /\$[a-zA-Z0-9_]+/,          // Variable references
        /[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/, // Property paths like obj.property
        /[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/, // Paths
        /^true$/, /^false$/,        // Boolean values
        /^null$/, /^undefined$/,    // Null values
        /^[0-9]+$/,                 // Pure numbers
        /^[0-9\s]+$/,               // Numbers and spaces

        // Database/enum values that are not user-facing
        /^admin$/, /^user$/, /^active$/, /^inactive$/, // Role/status values
        /^info$/, /^success$/, /^warning$/, /^error$/, // Log levels
        /^GET$/, /^POST$/, /^PUT$/, /^DELETE$/, // HTTP methods
    ];

    // Obvious user-facing patterns to include
    const userFacingPatterns = [
        // Text that looks like UI content
        /[A-Z][a-z].*[a-z]/,        // Mixed case with spaces (sentences)
        /[A-Z][a-z].*\./,           // Sentences ending with period
        /[A-Z][a-z].*[!?]/,         // Sentences with punctuation
        /[A-Z][a-z].*:/,            // Text with colons (labels)
        /.*[A-Z][a-z].*/,           // Contains words with capitalization

        // Common UI text patterns
        /^Are you sure/,            // Confirmation messages
        /successfully/,             // Success messages
        /Failed to/,                // Error messages
        /Invalid/,                  // Validation messages
        /is required/,              // Form validation
        /must be/,                  // Requirements
        /[A-Z][a-z].*![^.]*$/,      // Exclamations without periods
        /[A-Z][a-z].*\?[^.]*$/,     // Questions without periods
    ];

    // First check if it's obviously technical
    for (const pattern of technicalPatterns) {
        if (pattern.test(text)) {
            return false;
        }
    }

    // Then check if it's obviously user-facing
    for (const pattern of userFacingPatterns) {
        if (pattern.test(text)) {
            return true;
        }
    }

    // For remaining cases, make a judgment based on length and content
    // Very short strings are often technical
    if (text.length <= 2) {
        return false;
    }

    // Strings with mostly numbers are often technical
    if (/^[0-9\s\-:+\/.]+$/.test(text)) {
        return false;
    }

    // Strings with mixed case and spaces are often user-facing
    if (/[A-Z][a-z]/.test(text) && /\s/.test(text)) {
        return true;
    }

    // Default to false for ambiguous cases to reduce false positives
    return false;
}

// Function to generate a short hash for a string
function generateShortHash(text) {
    return crypto.createHash('md5').update(text).digest('hex').substring(0, 8);
}

// Function to generate translation key
function generateTranslationKey(file, text) {
    const fileName = path.basename(file, path.extname(file));
    const shortHash = generateShortHash(text);
    return `auto.${fileName}.${shortHash}`;
}

// Classify strings
const userFacingStrings = [];
const technicalStrings = [];

untranslatedData.forEach(item => {
    if (isUserFacingText(item)) {
        userFacingStrings.push({
            ...item,
            suggestedKey: generateTranslationKey(item.file, item.text)
        });
    } else {
        technicalStrings.push(item);
    }
});

// Write classified files
fs.writeFileSync('translations/untranslated_user_text.json', JSON.stringify(userFacingStrings, null, 2));
fs.writeFileSync('translations/untranslated_technical.json', JSON.stringify(technicalStrings, null, 2));

console.log(`Classification complete:`);
console.log(`- User-facing strings: ${userFacingStrings.length}`);
console.log(`- Technical strings: ${technicalStrings.length}`);

// Create translation entries for user-facing strings
const enTranslations = {};
const arTranslations = {};

userFacingStrings.forEach(item => {
    enTranslations[item.suggestedKey] = item.text;
    // For Arabic, we'll use a placeholder - in a real implementation, this would be translated
    arTranslations[item.suggestedKey] = `__TRANSLATE__: ${item.text}`;
});

// Write translation files
fs.writeFileSync('translations/user_text_en.json', JSON.stringify(enTranslations, null, 2));
fs.writeFileSync('translations/user_text_ar.json', JSON.stringify(arTranslations, null, 2));

console.log(`Translation files created with ${userFacingStrings.length} entries.`);