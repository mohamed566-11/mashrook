// Script to add the 10 new AI analysis templates
// Run this script using Node.js after starting the backend server

const API_BASE = 'https://b26db2dd6336.ngrok-free.app'; // Change if your backend runs on a different port

async function createTemplate(templateData) {
    try {
        const response = await fetch(`${API_BASE}/api/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(templateData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create template: ${response.status} ${errorText}`);
        }

        const template = await response.json();
        console.log(`Created template: ${template.name} (ID: ${template.id})`);
        return template.id;
    } catch (error) {
        console.error(`Error creating template "${templateData.name}":`, error.message);
        return null;
    }
}

async function createTemplateField(fieldData) {
    try {
        const response = await fetch(`${API_BASE}/api/templatefields`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create field: ${response.status} ${errorText}`);
        }

        const field = await response.json();
        console.log(`  Created field: ${field.label} (ID: ${field.id})`);
        return field.id;
    } catch (error) {
        console.error(`  Error creating field "${fieldData.label}":`, error.message);
        return null;
    }
}

async function main() {
    console.log('Adding 10 new AI analysis templates...\n');

    // Template 1: AI Business Idea Validator
    const template1Id = await createTemplate({
        name: 't("developer.templateBuilder.aiBusinessValidator")',
        description: 't("developer.templateBuilder.aiBusinessValidatorDesc")',
        category: 't("developer.templateBuilder.businessValidation")',
        duration: 25,
        isPopular: true
    });

    // Template 2: AI-Powered SWOT & PESTEL Builder
    const template2Id = await createTemplate({
        name: 't("developer.templateBuilder.aiSwotBuilder")',
        description: 't("developer.templateBuilder.aiSwotBuilderDesc")',
        category: 't("developer.templateBuilder.swotAndPestel")',
        duration: 30,
        isPopular: true
    });

    // Template 3: Building the Marketing Plan
    const template3Id = await createTemplate({
        name: 't("developer.templateBuilder.buildingMarketingPlan")',
        description: 't("developer.templateBuilder.buildingMarketingPlanDesc")',
        category: 't("developer.templateBuilder.marketing")',
        duration: 20,
        isPopular: false
    });

    // Template 4: Financial Performance Assessment
    const template4Id = await createTemplate({
        name: 't("developer.templateBuilder.financialPerformanceAssessment")',
        description: 't("developer.templateBuilder.financialPerformanceAssessmentDesc")',
        category: 't("developer.templateBuilder.financial")',
        duration: 20,
        isPopular: false
    });

    // Template 5: Assessing Growth Readiness
    const template5Id = await createTemplate({
        name: 't("developer.templateBuilder.assessingGrowthReadiness")',
        description: 't("developer.templateBuilder.assessingGrowthReadinessDesc")',
        category: 't("developer.templateBuilder.growth")',
        duration: 25,
        isPopular: false
    });

    // Template 6: Gap Analysis
    const template6Id = await createTemplate({
        name: 't("developer.templateBuilder.gapAnalysis")',
        description: 't("developer.templateBuilder.gapAnalysisDesc")',
        category: 't("developer.templateBuilder.analysis")',
        duration: 20,
        isPopular: false
    });

    // Template 7: AI Business Health Check
    const template7Id = await createTemplate({
        name: 't("developer.templateBuilder.aiBusinessHealthCheck")',
        description: 't("developer.templateBuilder.aiBusinessHealthCheckDesc")',
        category: 't("developer.templateBuilder.healthCheck")',
        duration: 15,
        isPopular: false
    });

    // Template 8: Digital Maturity Assessment
    const template8Id = await createTemplate({
        name: 't("developer.templateBuilder.digitalMaturityAssessment")',
        description: 't("developer.templateBuilder.digitalMaturityAssessmentDesc")',
        category: 't("developer.templateBuilder.digital")',
        duration: 25,
        isPopular: false
    });

    // Template 9: AI Pitch Deck Generator
    const template9Id = await createTemplate({
        name: 't("developer.templateBuilder.aiPitchDeckGenerator")',
        description: 't("developer.templateBuilder.aiPitchDeckGeneratorDesc")',
        category: 't("developer.templateBuilder.pitchDeck")',
        duration: 30,
        isPopular: true
    });

    // Template 10: AI-Based Market Opportunity Analyzer
    const template10Id = await createTemplate({
        name: 't("developer.templateBuilder.aiMarketOpportunityAnalyzer")',
        description: 't("developer.templateBuilder.aiMarketOpportunityAnalyzerDesc")',
        category: 't("developer.templateBuilder.marketOpportunity")',
        duration: 25,
        isPopular: false
    });

    console.log('\nTemplate creation completed. Template fields need to be added manually through the developer interface.');
    console.log('The following templates were created:');
    console.log(`1. t("developer.templateBuilder.aiBusinessValidator") (ID: ${template1Id})`);
    console.log(`2. t("developer.templateBuilder.aiSwotBuilder") (ID: ${template2Id})`);
    console.log(`3. t("developer.templateBuilder.buildingMarketingPlan") (ID: ${template3Id})`);
    console.log(`4. t("developer.templateBuilder.financialPerformanceAssessment") (ID: ${template4Id})`);
    console.log(`5. t("developer.templateBuilder.assessingGrowthReadiness") (ID: ${template5Id})`);
    console.log(`6. t("developer.templateBuilder.gapAnalysis") (ID: ${template6Id})`);
    console.log(`7. t("developer.templateBuilder.aiBusinessHealthCheck") (ID: ${template7Id})`);
    console.log(`8. t("developer.templateBuilder.digitalMaturityAssessment") (ID: ${template8Id})`);
    console.log(`9. t("developer.templateBuilder.aiPitchDeckGenerator") (ID: ${template9Id})`);
    console.log(`10. t("developer.templateBuilder.aiMarketOpportunityAnalyzer") (ID: ${template10Id})`);
}

// Run the script
main().catch(console.error);