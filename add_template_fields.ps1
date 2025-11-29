# PowerShell script to add template fields for templates 6-10

# Add type to handle SSL certificates
Add-Type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

# Function to add a field
function Add-TemplateField {
    param (
        [int]$TemplateId,
        [int]$StageNumber,
        [int]$FieldOrder,
        [string]$Label,
        [string]$InputType,
        [string]$Rationale,
        [bool]$IsRequired,
        [int]$MinLength = $null,
        [int]$MaxLength = $null,
        [bool]$MustBePositive = $false,
        [bool]$MustBeBetween0And100 = $false,
        [bool]$MustBeValidUrl = $false,
        [string]$FieldOptions = $null
    )

    $body = @{
        templateId = $TemplateId
        stageNumber = $StageNumber
        fieldOrder = $FieldOrder
        label = $Label
        inputType = $InputType
        rationale = $Rationale
        isRequired = $IsRequired
    }

    if ($MinLength -ne $null) { $body.minLength = $MinLength }
    if ($MaxLength -ne $null) { $body.maxLength = $MaxLength }
    if ($MustBePositive) { $body.mustBePositive = $MustBePositive }
    if ($MustBeBetween0And100) { $body.mustBeBetween0And100 = $MustBeBetween0And100 }
    if ($MustBeValidUrl) { $body.mustBeValidUrl = $MustBeValidUrl }
    if ($FieldOptions -ne $null) { $body.fieldOptions = $FieldOptions }

    try {
        $jsonBody = $body | ConvertTo-Json
        Write-Host "Adding field: $Label"
        Invoke-RestMethod -Uri "https://b26db2dd6336.ngrok-free.app/api/templatefields" -Method POST -Body $jsonBody -ContentType "application/json"
        Write-Host "Successfully added field: $Label"
    }
    catch {
        Write-Host "Error adding field: $Label"
        Write-Host "Error: $($_.Exception.Message)"
    }
}

# Template 6: Gap Analysis (ID: 31)
Write-Host "Adding fields for Gap Analysis (Template 31)..."

# Phase 1: Defining Context (Basic Information)
Add-TemplateField -TemplateId 31 -StageNumber 1 -FieldOrder 0 -Label "Company Name" -InputType "text" -Rationale "Company name for Gap Analysis" -IsRequired $true -MinLength 3
Add-TemplateField -TemplateId 31 -StageNumber 1 -FieldOrder 1 -Label "Industry" -InputType "dropdown" -Rationale "Industry for Gap Analysis" -IsRequired $true -FieldOptions '["Technology","Healthcare","Finance","Retail","Food & Beverage","Education","Manufacturing","Entertainment","Transportation","Real Estate","Other"]'
Add-TemplateField -TemplateId 31 -StageNumber 1 -FieldOrder 2 -Label "Location" -InputType "text" -Rationale "Location for Gap Analysis" -IsRequired $true
Add-TemplateField -TemplateId 31 -StageNumber 1 -FieldOrder 3 -Label "Business Type" -InputType "dropdown" -Rationale "Business type for Gap Analysis" -IsRequired $true -FieldOptions '["Startup","SME","Enterprise","Non-Profit","Government"]'

# Phase 2: Financial Baseline (Financial Details)
Add-TemplateField -TemplateId 31 -StageNumber 2 -FieldOrder 0 -Label "Current Annual Revenue" -InputType "number" -Rationale "Current annual revenue for Gap Analysis" -IsRequired $true
Add-TemplateField -TemplateId 31 -StageNumber 2 -FieldOrder 1 -Label "Current Net Profit" -InputType "number" -Rationale "Current net profit for Gap Analysis" -IsRequired $true

# Phase 3: Current Operational Capabilities (Operations)
Add-TemplateField -TemplateId 31 -StageNumber 3 -FieldOrder 0 -Label "Current Number of Employees" -InputType "number" -Rationale "Current number of employees for Gap Analysis" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 31 -StageNumber 3 -FieldOrder 1 -Label "Description of Current Core Operations" -InputType "textarea" -Rationale "Description of current core operations for Gap Analysis" -IsRequired $true -MinLength 100

# Phase 4: Current Market Position (Market & Strategy)
Add-TemplateField -TemplateId 31 -StageNumber 4 -FieldOrder 0 -Label "Current Target Audience" -InputType "textarea" -Rationale "Current target audience for Gap Analysis" -IsRequired $true -MinLength 50
Add-TemplateField -TemplateId 31 -StageNumber 4 -FieldOrder 1 -Label "Current Market Share (%)" -InputType "number" -Rationale "Current market share for Gap Analysis" -IsRequired $true -MustBeBetween0And100 $true

# Phase 5: Gap Measurement (Industry-Specific)
Add-TemplateField -TemplateId 31 -StageNumber 5 -FieldOrder 0 -Label "Target Annual Revenue (within 3 years)" -InputType "number" -Rationale "Target annual revenue for Gap Analysis" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 31 -StageNumber 5 -FieldOrder 1 -Label "Target Market Share (%)" -InputType "number" -Rationale "Target market share for Gap Analysis" -IsRequired $true -MustBeBetween0And100 $true
Add-TemplateField -TemplateId 31 -StageNumber 5 -FieldOrder 2 -Label "Description of Required Operational Improvements" -InputType "textarea" -Rationale "Operational improvements for Gap Analysis" -IsRequired $true -MinLength 100
Add-TemplateField -TemplateId 31 -StageNumber 5 -FieldOrder 3 -Label "Skills Required to Achieve Future Goals" -InputType "textarea" -Rationale "Skills required for Gap Analysis" -IsRequired $true -MinLength 50

Write-Host "Gap Analysis fields added successfully!"

# Template 7: AI Business Health Check (ID: 32)
Write-Host "Adding fields for AI Business Health Check (Template 32)..."

# Phase 1: Company Identity (Basic Information)
Add-TemplateField -TemplateId 32 -StageNumber 1 -FieldOrder 0 -Label "Company Name" -InputType "text" -Rationale "Company name for Business Health Check" -IsRequired $true -MinLength 3
Add-TemplateField -TemplateId 32 -StageNumber 1 -FieldOrder 1 -Label "Industry" -InputType "dropdown" -Rationale "Industry for Business Health Check" -IsRequired $true -FieldOptions '["Technology","Healthcare","Finance","Retail","Food & Beverage","Education","Manufacturing","Entertainment","Transportation","Real Estate","Other"]'

# Phase 2: Initial Financial Indicators (Financial Details)
Add-TemplateField -TemplateId 32 -StageNumber 2 -FieldOrder 0 -Label "Annual Revenue" -InputType "number" -Rationale "Annual revenue for Business Health Check" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 32 -StageNumber 2 -FieldOrder 1 -Label "Net Profit" -InputType "number" -Rationale "Net profit for Business Health Check" -IsRequired $true

# Phase 3: Operational Efficiency (Operations)
Add-TemplateField -TemplateId 32 -StageNumber 3 -FieldOrder 0 -Label "Number of Employees" -InputType "number" -Rationale "Number of employees for Business Health Check" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 32 -StageNumber 3 -FieldOrder 1 -Label "Average Order Cycle Time (Order to Delivery)" -InputType "text" -Rationale "Average order cycle time for Business Health Check" -IsRequired $true

# Phase 4: Market Relations (Market & Strategy)
Add-TemplateField -TemplateId 32 -StageNumber 4 -FieldOrder 0 -Label "Key Competitors" -InputType "text" -Rationale "Key competitors for Business Health Check" -IsRequired $false
Add-TemplateField -TemplateId 32 -StageNumber 4 -FieldOrder 1 -Label "Main Marketing Channels" -InputType "multiselect" -Rationale "Main marketing channels for Business Health Check" -IsRequired $true -FieldOptions '["Social Media","Email Marketing","Content Marketing","SEO","PPC Advertising","TV/Radio","Print Media","Events","Referral Program","Partnerships"]'

# Phase 5: Business Vital Signs (Industry-Specific)
Add-TemplateField -TemplateId 32 -StageNumber 5 -FieldOrder 0 -Label "Operating Cash Flow (Last 12 Months)" -InputType "number" -Rationale "Operating cash flow for Business Health Check" -IsRequired $true
Add-TemplateField -TemplateId 32 -StageNumber 5 -FieldOrder 1 -Label "Debt-to-Equity Ratio" -InputType "number" -Rationale "Debt-to-equity ratio for Business Health Check" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 32 -StageNumber 5 -FieldOrder 2 -Label "Customer Retention Rate (% Annually)" -InputType "number" -Rationale "Customer retention rate for Business Health Check" -IsRequired $true -MustBeBetween0And100 $true
Add-TemplateField -TemplateId 32 -StageNumber 5 -FieldOrder 3 -Label "Average Customer Satisfaction Score (CSAT) (out of 5)" -InputType "slider" -Rationale "Average CSAT for Business Health Check" -IsRequired $true -FieldOptions '{"min":1,"max":5}'
Add-TemplateField -TemplateId 32 -StageNumber 5 -FieldOrder 4 -Label "Employee Turnover Rate (% Annually)" -InputType "number" -Rationale "Employee turnover rate for Business Health Check" -IsRequired $true -MustBeBetween0And100 $true

Write-Host "AI Business Health Check fields added successfully!"

# Template 8: Digital Maturity Assessment (ID: 33)
Write-Host "Adding fields for Digital Maturity Assessment (Template 33)..."

# Phase 1: Core Digital Identity (Basic Information)
Add-TemplateField -TemplateId 33 -StageNumber 1 -FieldOrder 0 -Label "Company Name" -InputType "text" -Rationale "Company name for Digital Maturity Assessment" -IsRequired $true
Add-TemplateField -TemplateId 33 -StageNumber 1 -FieldOrder 1 -Label "Industry" -InputType "dropdown" -Rationale "Industry for Digital Maturity Assessment" -IsRequired $true -FieldOptions '["Technology","Healthcare","Finance","Retail","Food & Beverage","Education","Manufacturing","Entertainment","Transportation","Real Estate","Other"]'
Add-TemplateField -TemplateId 33 -StageNumber 1 -FieldOrder 2 -Label "Website Link" -InputType "text" -Rationale "Website link for Digital Maturity Assessment" -IsRequired $true -MustBeValidUrl $true

# Phase 2: Digital Investment (Financial Details)
Add-TemplateField -TemplateId 33 -StageNumber 2 -FieldOrder 0 -Label "Annual Budget for Technology/Digitalization" -InputType "number" -Rationale "Annual budget for Digital Maturity Assessment" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 33 -StageNumber 2 -FieldOrder 1 -Label "Number of Employees in IT/Digital Department" -InputType "number" -Rationale "Number of IT employees for Digital Maturity Assessment" -IsRequired $true -MustBePositive $true

# Phase 3: Digital Tools and Processes (Operations)
Add-TemplateField -TemplateId 33 -StageNumber 3 -FieldOrder 0 -Label "Main Business Software Used (CRM, ERP, etc.)" -InputType "multiselect" -Rationale "Main business software for Digital Maturity Assessment" -IsRequired $true -FieldOptions '["CRM","ERP","HR Management","Accounting Software","Project Management","Analytics Tools","E-commerce Platform","Other"]'
Add-TemplateField -TemplateId 33 -StageNumber 3 -FieldOrder 1 -Label "To what extent are your routine and repetitive tasks automated?" -InputType "slider" -Rationale "Task automation level for Digital Maturity Assessment" -IsRequired $true -FieldOptions '{"min":1,"max":5}'

# Phase 4: Digital Market Interaction (Market & Strategy)
Add-TemplateField -TemplateId 33 -StageNumber 4 -FieldOrder 0 -Label "How do your customers interact with you digitally?" -InputType "multiselect" -Rationale "Customer digital interaction for Digital Maturity Assessment" -IsRequired $true -FieldOptions '["Website","Mobile App","Social Media","Chatbots","Email","Online Support","Video Calls","Other"]'
Add-TemplateField -TemplateId 33 -StageNumber 4 -FieldOrder 1 -Label "Do you use paid digital advertising?" -InputType "dropdown" -Rationale "Paid digital advertising for Digital Maturity Assessment" -IsRequired $true -FieldOptions '["Yes","No"]'

# Phase 5: Digital Maturity Dimensions (Industry-Specific)
Add-TemplateField -TemplateId 33 -StageNumber 5 -FieldOrder 0 -Label "To what extent is digitalization part of your core business strategy?" -InputType "slider" -Rationale "Digitalization strategy for Digital Maturity Assessment" -IsRequired $true -FieldOptions '{"min":1,"max":5}'
Add-TemplateField -TemplateId 33 -StageNumber 5 -FieldOrder 1 -Label "How integrated are your core technological systems (e.g., CRM, ERP)?" -InputType "dropdown" -Rationale "System integration for Digital Maturity Assessment" -IsRequired $true -FieldOptions '["Not integrated","Partially integrated","Fully integrated"]'
Add-TemplateField -TemplateId 33 -StageNumber 5 -FieldOrder 2 -Label "To what extent do you use data analytics for decision-making?" -InputType "slider" -Rationale "Data analytics usage for Digital Maturity Assessment" -IsRequired $true -FieldOptions '{"min":1,"max":5}'
Add-TemplateField -TemplateId 33 -StageNumber 5 -FieldOrder 3 -Label "How much does your team possess the necessary digital skills?" -InputType "slider" -Rationale "Team digital skills for Digital Maturity Assessment" -IsRequired $true -FieldOptions '{"min":1,"max":5}'

Write-Host "Digital Maturity Assessment fields added successfully!"

# Template 9: AI Pitch Deck Generator (ID: 34)
Write-Host "Adding fields for AI Pitch Deck Generator (Template 34)..."

# Phase 1: Core Idea (Basic Information)
Add-TemplateField -TemplateId 34 -StageNumber 1 -FieldOrder 0 -Label "Company Name and Tagline" -InputType "text" -Rationale "Company name and tagline for Pitch Deck Generator" -IsRequired $true
Add-TemplateField -TemplateId 34 -StageNumber 1 -FieldOrder 1 -Label "The Problem (Describe the pain point)" -InputType "textarea" -Rationale "Problem description for Pitch Deck Generator" -IsRequired $true -MinLength 150
Add-TemplateField -TemplateId 34 -StageNumber 1 -FieldOrder 2 -Label "The Solution (How you solve the problem)" -InputType "textarea" -Rationale "Solution description for Pitch Deck Generator" -IsRequired $true -MinLength 150

# Phase 2: Financial Model (Financial Details)
Add-TemplateField -TemplateId 34 -StageNumber 2 -FieldOrder 0 -Label "Business Model (How you make money)" -InputType "textarea" -Rationale "Business model for Pitch Deck Generator" -IsRequired $true -MinLength 50
Add-TemplateField -TemplateId 34 -StageNumber 2 -FieldOrder 1 -Label "Revenue Projections (3 Years)" -InputType "text" -Rationale "Revenue projections for Pitch Deck Generator" -IsRequired $true
Add-TemplateField -TemplateId 34 -StageNumber 2 -FieldOrder 2 -Label "The Ask (Amount being sought)" -InputType "number" -Rationale "Funding ask for Pitch Deck Generator" -IsRequired $true -MustBePositive $true

# Phase 3: Product and Traction (Operations)
Add-TemplateField -TemplateId 34 -StageNumber 3 -FieldOrder 0 -Label "The Product (Describe how it works)" -InputType "textarea" -Rationale "Product description for Pitch Deck Generator" -IsRequired $true -MinLength 100
Add-TemplateField -TemplateId 34 -StageNumber 3 -FieldOrder 1 -Label "Progress Made So Far (Traction)" -InputType "textarea" -Rationale "Traction for Pitch Deck Generator" -IsRequired $true -MinLength 50

# Phase 4: Competitive Landscape (Market & Strategy)
Add-TemplateField -TemplateId 34 -StageNumber 4 -FieldOrder 0 -Label "Market Size (TAM, SAM, SOM)" -InputType "textarea" -Rationale "Market size for Pitch Deck Generator" -IsRequired $true -MinLength 50
Add-TemplateField -TemplateId 34 -StageNumber 4 -FieldOrder 1 -Label "Key Competitors and Your Competitive Advantage" -InputType "textarea" -Rationale "Competitive advantage for Pitch Deck Generator" -IsRequired $true -MinLength 100

# Phase 5: The Masterminds (Industry-Specific)
Add-TemplateField -TemplateId 34 -StageNumber 5 -FieldOrder 0 -Label "Founding Team (Names, Roles, and Experience)" -InputType "textarea" -Rationale "Founding team for Pitch Deck Generator" -IsRequired $true -MinLength 150
Add-TemplateField -TemplateId 34 -StageNumber 5 -FieldOrder 1 -Label "Key Advisors (If any)" -InputType "textarea" -Rationale "Key advisors for Pitch Deck Generator" -IsRequired $false

Write-Host "AI Pitch Deck Generator fields added successfully!"

# Template 10: AI-Based Market Opportunity Analyzer (ID: 35)
Write-Host "Adding fields for AI-Based Market Opportunity Analyzer (Template 35)..."

# Phase 1: Defining the Company (Basic Information)
Add-TemplateField -TemplateId 35 -StageNumber 1 -FieldOrder 0 -Label "Company Name" -InputType "text" -Rationale "Company name for Market Opportunity Analyzer" -IsRequired $true
Add-TemplateField -TemplateId 35 -StageNumber 1 -FieldOrder 1 -Label "Current Industry" -InputType "dropdown" -Rationale "Current industry for Market Opportunity Analyzer" -IsRequired $true -FieldOptions '["Technology","Healthcare","Finance","Retail","Food & Beverage","Education","Manufacturing","Entertainment","Transportation","Real Estate","Other"]'

# Phase 2: Company Financial Capacity (Financial Details)
Add-TemplateField -TemplateId 35 -StageNumber 2 -FieldOrder 0 -Label "Current Annual Revenue" -InputType "number" -Rationale "Current annual revenue for Market Opportunity Analyzer" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 35 -StageNumber 2 -FieldOrder 1 -Label "Capital Available for New Investment Opportunities" -InputType "number" -Rationale "Capital available for Market Opportunity Analyzer" -IsRequired $true -MustBePositive $true

# Phase 3: Core Competencies (Operations)
Add-TemplateField -TemplateId 35 -StageNumber 3 -FieldOrder 0 -Label "Key Team Skills and Competencies" -InputType "textarea" -Rationale "Key team skills for Market Opportunity Analyzer" -IsRequired $true -MinLength 100
Add-TemplateField -TemplateId 35 -StageNumber 3 -FieldOrder 1 -Label "Key Technological or Physical Assets" -InputType "textarea" -Rationale "Main assets for Market Opportunity Analyzer" -IsRequired $true -MinLength 50

# Phase 4: Current Strategic Position (Market & Strategy)
Add-TemplateField -TemplateId 35 -StageNumber 4 -FieldOrder 0 -Label "Company's Long-Term Vision and Strategic Goals" -InputType "textarea" -Rationale "Strategic vision for Market Opportunity Analyzer" -IsRequired $true -MinLength 100

# Phase 5: Market Opportunity Assessment (Industry-Specific)
Add-TemplateField -TemplateId 35 -StageNumber 5 -FieldOrder 0 -Label "Description of the Target Market Opportunity/Segment" -InputType "textarea" -Rationale "Market opportunity description for Market Opportunity Analyzer" -IsRequired $true -MinLength 100
Add-TemplateField -TemplateId 35 -StageNumber 5 -FieldOrder 1 -Label "Estimated Market Size (USD Annually)" -InputType "number" -Rationale "Market size for Market Opportunity Analyzer" -IsRequired $true -MustBePositive $true
Add-TemplateField -TemplateId 35 -StageNumber 5 -FieldOrder 2 -Label "Expected Market Growth Rate (% Annually)" -InputType "number" -Rationale "Market growth rate for Market Opportunity Analyzer" -IsRequired $true
Add-TemplateField -TemplateId 35 -StageNumber 5 -FieldOrder 3 -Label "Number of Direct Competitors" -InputType "dropdown" -Rationale "Number of competitors for Market Opportunity Analyzer" -IsRequired $true -FieldOptions '["0-2","3-5","6-10","+10"]'
Add-TemplateField -TemplateId 35 -StageNumber 5 -FieldOrder 4 -Label "What are the main barriers to entry in this market?" -InputType "textarea" -Rationale "Barriers to entry for Market Opportunity Analyzer" -IsRequired $true -MinLength 50

Write-Host "AI-Based Market Opportunity Analyzer fields added successfully!"

Write-Host "All template fields added successfully!"