const fs = require('fs');
const path = require('path');

// Migration files to fix
const migrationFiles = [
    'Masroo3k.Api/Migrations/20251108003019_InitialCreateSQLServer.Designer.cs',
    'Masroo3k.Api/Migrations/20251108003019_InitialCreateSQLServer.cs',
    'Masroo3k.Api/Migrations/AppDbContextModelSnapshot.cs'
];

// Function to fix a file
function fixFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Fix migration name
    content = content.replace(/"_localizer\["[^"]*"\]"/g, '"InitialCreateSQLServer"');

    // Fix data types
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.fa7153f7"\]"/g, '"int"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.dca44442"\]"/g, '"datetime2"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.d78cbc7b"\]"/g, '"nvarchar(max)"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.47b2e8f4"\]"/g, '"nvarchar(255)"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.02bd0ece"\]"/g, '"nvarchar(100)"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.722bbc65"\]"/g, '"nvarchar(1000)"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.80e986b3"\]"/g, '"nvarchar(280)"');
    content = content.replace(/"_localizer\["auto\.20251108003019_InitialCreateSQLServer\.f67169df"\]"/g, '"bit"');
    content = content.replace(/"_localizer\["auto\.AppDbContext\.e246d6fa"\]"/g, '"decimal(18,2)"');

    // Fix column names - replace with generic names
    content = content.replace(/"_localizer\["[^"]*"\]"/g, function (match) {
        // Extract the key name and create a generic column name
        const key = match.match(/"_localizer\[["']([^"']*)["']\]"/);
        if (key && key[1]) {
            // Convert key to a valid column name by taking the last part after the dot
            const parts = key[1].split('.');
            const columnName = parts[parts.length - 1];
            // Convert to PascalCase and remove invalid characters
            return `"${columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/[^a-zA-Z0-9]/g, '')}"`;
        }
        return '"Name"'; // Default fallback
    });

    // Fix table names
    content = content.replace(/"_localizer\["admin\.analyses"\]"/g, '"Analyses"');
    content = content.replace(/"_localizer\["admin\.notifications"\]"/g, '"Notifications"');
    content = content.replace(/"_localizer\["admin\.templates"\]"/g, '"Templates"');
    content = content.replace(/"_localizer\["admin\.users"\]"/g, '"Users"');
    content = content.replace(/"_localizer\["notifications\.title"\]"/g, '"Notifications"');
    content = content.replace(/"_localizer\["activityLogs\.title"\]"/g, '"ActivityLogs"');

    // Fix any remaining _localizer references
    content = content.replace(/_localizer\["[^"]*"\]/g, 'Name');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
}

// Fix each migration file
migrationFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    fixFile(fullPath);
});

console.log('Migration files fixed!');