const fs = require('fs');
const path = require('path');

// Function to scan for RTL issues in a file
function scanFileForRTLIssues(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for hardcoded text (strings not using t() function)
    const hardcodedTextMatches = content.match(/[^a-zA-Z0-9_>][A-Z][a-zA-Z ]{5,}[^<a-zA-Z0-9_]/g);
    if (hardcodedTextMatches) {
        hardcodedTextMatches.forEach(match => {
            const cleanMatch = match.trim();
            if (!cleanMatch.includes('t(') && !cleanMatch.includes('className') && !cleanMatch.includes('http')) {
                issues.push({
                    type: 'Hardcoded Text',
                    line: content.substring(0, content.indexOf(match)).split('\n').length,
                    text: cleanMatch
                });
            }
        });
    }

    // Check for incorrect translation key usage in attributes
    const incorrectTranslationKeys = content.match(/[a-zA-Z-]*=["'][^"]*t\([^)]*\)[^"]*["']/g);
    if (incorrectTranslationKeys) {
        incorrectTranslationKeys.forEach(match => {
            issues.push({
                type: 'Incorrect Translation Key Usage',
                line: content.substring(0, content.indexOf(match)).split('\n').length,
                text: match.trim()
            });
        });
    }

    // Check for missing RTL classes
    const flexLayouts = content.match(/flex[-a-zA-Z0-9]*[:=]["'][^"]*flex[-a-zA-Z0-9]*/g);
    if (flexLayouts && !content.includes('rtl:')) {
        flexLayouts.forEach(match => {
            issues.push({
                type: 'Missing RTL Support',
                line: content.substring(0, content.indexOf(match)).split('\n').length,
                text: 'Flex layout without RTL support: ' + match.trim()
            });
        });
    }

    // Check for icon positioning that may need mirroring
    const iconComponents = content.match(/<([A-Za-z]+Icon|Arrow|Download|Calendar|Plus)[^>]*>/g);
    if (iconComponents) {
        iconComponents.forEach(match => {
            if (!content.includes('rtl:')) {
                issues.push({
                    type: 'Icon Positioning',
                    line: content.substring(0, content.indexOf(match)).split('\n').length,
                    text: 'Icon that may need RTL mirroring: ' + match.trim()
                });
            }
        });
    }

    return issues;
}

// Function to scan directory recursively
function scanDirectory(dirPath) {
    let allIssues = {};

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const subDirIssues = scanDirectory(fullPath);
            Object.assign(allIssues, subDirIssues);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            const issues = scanFileForRTLIssues(fullPath);
            if (issues.length > 0) {
                allIssues[fullPath] = issues;
            }
        }
    });

    return allIssues;
}

// Main execution
try {
    console.log('Starting RTL audit scan...');

    // Scan the components directory
    const componentsDir = path.join('.', 'components');
    const pagesDir = path.join('.', 'pages');

    let allIssues = {};

    if (fs.existsSync(componentsDir)) {
        Object.assign(allIssues, scanDirectory(componentsDir));
    }

    if (fs.existsSync(pagesDir)) {
        Object.assign(allIssues, scanDirectory(pagesDir));
    }

    // Generate report
    let report = '# RTL Audit Scan Results\n\n';
    report += '## Summary\n';
    report += `Scanned ${Object.keys(allIssues).length} files with potential RTL issues.\n\n`;

    report += '## Detailed Findings\n\n';

    for (const [filePath, issues] of Object.entries(allIssues)) {
        report += `### ${filePath}\n\n`;

        // Group issues by type
        const issuesByType = {};
        issues.forEach(issue => {
            if (!issuesByType[issue.type]) {
                issuesByType[issue.type] = [];
            }
            issuesByType[issue.type].push(issue);
        });

        for (const [type, typeIssues] of Object.entries(issuesByType)) {
            report += `#### ${type}\n`;
            typeIssues.forEach(issue => {
                report += `- Line ${issue.line}: ${issue.text}\n`;
            });
            report += '\n';
        }

        report += '\n';
    }

    // Append to existing report
    const existingReport = fs.readFileSync('ui/rtl_audit_report.md', 'utf8');
    const updatedReport = existingReport + '\n\n' + report;

    fs.writeFileSync('ui/rtl_audit_report.md', updatedReport);

    console.log('RTL audit scan completed. Report updated at ui/rtl_audit_report.md');
} catch (error) {
    console.error('Error during RTL audit scan:', error);
}