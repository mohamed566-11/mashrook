using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();

    static async Task Main(string[] args)
    {
        // Skip SSL certificate validation (for development only)
        var handler = new HttpClientHandler();
        handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true;
        client = new HttpClient(handler);

        // Template 6: Gap Analysis (ID: 31)
        await AddGapAnalysisFields();

        // Template 7: AI Business Health Check (ID: 32)
        await AddBusinessHealthCheckFields();

        // Template 8: Digital Maturity Assessment (ID: 33)
        await AddDigitalMaturityFields();

        // Template 9: AI Pitch Deck Generator (ID: 34)
        await AddPitchDeckGeneratorFields();

        // Template 10: AI-Based Market Opportunity Analyzer (ID: 35)
        await AddMarketOpportunityAnalyzerFields();

        Console.WriteLine("_localizer["auto.Program.a4c731b2"]");
    }

    static async Task AddGapAnalysisFields()
    {
        Console.WriteLine("Adding fields for Gap Analysis (Template 31)...");

        // Phase 1: Defining Context (Basic Information)
        await AddField(new {
            templateId = 31,
            stageNumber = 1,
            fieldOrder = 0,
            label = "_localizer["auto.Program.e7b47c58"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.f10114d5"]",
            isRequired = true,
            minLength = 3
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 1,
            fieldOrder = 1,
            label = "_localizer["auto.Program.4fd0a37b"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.f33ff08d"]",
            rationale = "_localizer["auto.Program.55b90fc4"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 1,
            fieldOrder = 2,
            label = "_localizer["auto.Program.ce5bf551"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.36b81c29"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 1,
            fieldOrder = 3,
            label = "_localizer["auto.Program.1d5ad3d3"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.0768109e"]",
            rationale = "_localizer["auto.Program.b00f6293"]",
            isRequired = true
        });

        // Phase 2: Financial Baseline (Financial Details)
        await AddField(new {
            templateId = 31,
            stageNumber = 2,
            fieldOrder = 0,
            label = "_localizer["auto.Program.19c63927"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.06f82a81"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 2,
            fieldOrder = 1,
            label = "_localizer["auto.Program.6c2e4378"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.5e6e2d9d"]",
            isRequired = true
        });

        // Phase 3: Current Operational Capabilities (Operations)
        await AddField(new {
            templateId = 31,
            stageNumber = 3,
            fieldOrder = 0,
            label = "_localizer["auto.Program.37aaf6c1"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.a2a3061c"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 3,
            fieldOrder = 1,
            label = "_localizer["auto.Program.2881a791"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.690e5b2b"]",
            isRequired = true,
            minLength = 100
        });

        // Phase 4: Current Market Position (Market & Strategy)
        await AddField(new {
            templateId = 31,
            stageNumber = 4,
            fieldOrder = 0,
            label = "_localizer["auto.Program.d96b3143"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.1372555a"]",
            isRequired = true,
            minLength = 50
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 4,
            fieldOrder = 1,
            label = "_localizer["auto.Program.f5514ac7"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.bc1dd5fa"]",
            isRequired = true,
            mustBeBetween0And100 = true
        });

        // Phase 5: Gap Measurement (Industry-Specific)
        await AddField(new {
            templateId = 31,
            stageNumber = 5,
            fieldOrder = 0,
            label = "_localizer["auto.Program.f1bd7fca"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.39406fef"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 5,
            fieldOrder = 1,
            label = "_localizer["auto.Program.7e70cf37"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.afc4275f"]",
            isRequired = true,
            mustBeBetween0And100 = true
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 5,
            fieldOrder = 2,
            label = "_localizer["auto.Program.5055274c"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.86814f98"]",
            isRequired = true,
            minLength = 100
        });

        await AddField(new {
            templateId = 31,
            stageNumber = 5,
            fieldOrder = 3,
            label = "_localizer["auto.Program.3b5ef3a6"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.46ba8f20"]",
            isRequired = true,
            minLength = 50
        });

        Console.WriteLine("_localizer["auto.Program.02c2b6b7"]");
    }

    static async Task AddBusinessHealthCheckFields()
    {
        Console.WriteLine("Adding fields for AI Business Health Check (Template 32)...");

        // Phase 1: Company Identity (Basic Information)
        await AddField(new {
            templateId = 32,
            stageNumber = 1,
            fieldOrder = 0,
            label = "_localizer["auto.Program.e7b47c58"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.1cbc4244"]",
            isRequired = true,
            minLength = 3
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 1,
            fieldOrder = 1,
            label = "_localizer["auto.Program.4fd0a37b"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.f33ff08d"]",
            rationale = "_localizer["auto.Program.d18c9ad0"]",
            isRequired = true
        });

        // Phase 2: Initial Financial Indicators (Financial Details)
        await AddField(new {
            templateId = 32,
            stageNumber = 2,
            fieldOrder = 0,
            label = "_localizer["auto.Program.6b1d2364"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.cc5bd73c"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 2,
            fieldOrder = 1,
            label = "_localizer["auto.Program.43d729c7"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.f796a228"]",
            isRequired = true
        });

        // Phase 3: Operational Efficiency (Operations)
        await AddField(new {
            templateId = 32,
            stageNumber = 3,
            fieldOrder = 0,
            label = "_localizer["auto.Program.4d34dfbe"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.34551462"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 3,
            fieldOrder = 1,
            label = "_localizer["auto.Program.498a838f"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.eadcf2c8"]",
            isRequired = true
        });

        // Phase 4: Market Relations (Market & Strategy)
        await AddField(new {
            templateId = 32,
            stageNumber = 4,
            fieldOrder = 0,
            label = "_localizer["auto.Program.241ee239"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.5967fc71"]",
            isRequired = false
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 4,
            fieldOrder = 1,
            label = "_localizer["auto.Program.b95157d8"]",
            inputType = "_localizer["auto.Program.b66abfe0"]",
            fieldOptions = "[\"Social Media\",\"Email Marketing\",\"Content Marketing\",\"SEO\",\"PPC Advertising\",\"TV/Radio\",\"Print Media\",\"Events\",\"Referral Program\",\"Partnerships\"]",
            rationale = "_localizer["auto.Program.d096eafe"]",
            isRequired = true
        });

        // Phase 5: Business Vital Signs (Industry-Specific)
        await AddField(new {
            templateId = 32,
            stageNumber = 5,
            fieldOrder = 0,
            label = "_localizer["auto.Program.ed0efb50"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.b1cfc6fe"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 5,
            fieldOrder = 1,
            label = "_localizer["auto.Program.654db757"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.f9e32240"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 5,
            fieldOrder = 2,
            label = "_localizer["auto.Program.459aaf30"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.fcabdb3a"]",
            isRequired = true,
            mustBeBetween0And100 = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 5,
            fieldOrder = 3,
            label = "_localizer["auto.Program.7b811d4c"]",
            inputType = "_localizer["auto.Program.10bf08f0"]",
            fieldOptions = "{\"min\":1,\"max\":5}",
            rationale = "_localizer["auto.Program.ba8becb7"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 32,
            stageNumber = 5,
            fieldOrder = 4,
            label = "_localizer["auto.Program.16902939"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.1677192d"]",
            isRequired = true,
            mustBeBetween0And100 = true
        });

        Console.WriteLine("_localizer["auto.Program.02c06e0c"]");
    }

    static async Task AddDigitalMaturityFields()
    {
        Console.WriteLine("Adding fields for Digital Maturity Assessment (Template 33)...");

        // Phase 1: Core Digital Identity (Basic Information)
        await AddField(new {
            templateId = 33,
            stageNumber = 1,
            fieldOrder = 0,
            label = "_localizer["auto.Program.e7b47c58"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.300d1a7a"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 1,
            fieldOrder = 1,
            label = "_localizer["auto.Program.4fd0a37b"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.f33ff08d"]",
            rationale = "_localizer["auto.Program.cf5b7ddc"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 1,
            fieldOrder = 2,
            label = "_localizer["auto.Program.6deb1b7c"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.4a8ec34c"]",
            isRequired = true,
            mustBeValidUrl = true
        });

        // Phase 2: Digital Investment (Financial Details)
        await AddField(new {
            templateId = 33,
            stageNumber = 2,
            fieldOrder = 0,
            label = "Annual Budget for Technology/Digitalization",
            inputType = "number",
            rationale = "_localizer["auto.Program.021ce131"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 2,
            fieldOrder = 1,
            label = "Number of Employees in IT/Digital Department",
            inputType = "number",
            rationale = "_localizer["auto.Program.8c7fe2c7"]",
            isRequired = true,
            mustBePositive = true
        });

        // Phase 3: Digital Tools and Processes (Operations)
        await AddField(new {
            templateId = 33,
            stageNumber = 3,
            fieldOrder = 0,
            label = "_localizer["auto.Program.2a93d1fe"]",
            inputType = "_localizer["auto.Program.b66abfe0"]",
            fieldOptions = "_localizer["auto.Program.b96d8804"]",
            rationale = "_localizer["auto.Program.c76b74de"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 3,
            fieldOrder = 1,
            label = "_localizer["auto.Program.83bb8069"]",
            inputType = "_localizer["auto.Program.10bf08f0"]",
            fieldOptions = "{\"min\":1,\"max\":5}",
            rationale = "_localizer["auto.Program.2c437834"]",
            isRequired = true
        });

        // Phase 4: Digital Market Interaction (Market & Strategy)
        await AddField(new {
            templateId = 33,
            stageNumber = 4,
            fieldOrder = 0,
            label = "_localizer["auto.Program.53941045"]",
            inputType = "_localizer["auto.Program.b66abfe0"]",
            fieldOptions = "_localizer["auto.Program.770e6967"]",
            rationale = "_localizer["auto.Program.6bf8bf5d"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 4,
            fieldOrder = 1,
            label = "_localizer["auto.Program.2643e327"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.fa8c0369"]",
            rationale = "_localizer["auto.Program.940c55fe"]",
            isRequired = true
        });

        // Phase 5: Digital Maturity Dimensions (Industry-Specific)
        await AddField(new {
            templateId = 33,
            stageNumber = 5,
            fieldOrder = 0,
            label = "_localizer["auto.Program.4c6d0e82"]",
            inputType = "_localizer["auto.Program.10bf08f0"]",
            fieldOptions = "{\"min\":1,\"max\":5}",
            rationale = "_localizer["auto.Program.d2f6974e"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 5,
            fieldOrder = 1,
            label = "How integrated are your core technological systems (e.g., CRM, ERP)?",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.cd21ff71"]",
            rationale = "_localizer["auto.Program.91b6b23c"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 5,
            fieldOrder = 2,
            label = "_localizer["auto.Program.d06b434a"]",
            inputType = "_localizer["auto.Program.10bf08f0"]",
            fieldOptions = "{\"min\":1,\"max\":5}",
            rationale = "_localizer["auto.Program.717bd358"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 33,
            stageNumber = 5,
            fieldOrder = 3,
            label = "_localizer["auto.Program.329facf0"]",
            inputType = "_localizer["auto.Program.10bf08f0"]",
            fieldOptions = "{\"min\":1,\"max\":5}",
            rationale = "_localizer["auto.Program.bb1cc91d"]",
            isRequired = true
        });

        Console.WriteLine("_localizer["auto.Program.015f1a5c"]");
    }

    static async Task AddPitchDeckGeneratorFields()
    {
        Console.WriteLine("Adding fields for AI Pitch Deck Generator (Template 34)...");

        // Phase 1: Core Idea (Basic Information)
        await AddField(new {
            templateId = 34,
            stageNumber = 1,
            fieldOrder = 0,
            label = "_localizer["auto.Program.f5383c71"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.a1e1b1d7"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 1,
            fieldOrder = 1,
            label = "_localizer["auto.Program.a8cf1d26"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.fc3c723c"]",
            isRequired = true,
            minLength = 150
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 1,
            fieldOrder = 2,
            label = "_localizer["auto.Program.a0f9390d"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.bf7534f8"]",
            isRequired = true,
            minLength = 150
        });

        // Phase 2: Financial Model (Financial Details)
        await AddField(new {
            templateId = 34,
            stageNumber = 2,
            fieldOrder = 0,
            label = "_localizer["auto.Program.ef2019ba"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.bae03f92"]",
            isRequired = true,
            minLength = 50
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 2,
            fieldOrder = 1,
            label = "_localizer["auto.Program.d947b341"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.5f322d80"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 2,
            fieldOrder = 2,
            label = "_localizer["auto.Program.686e40f9"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.e809f0b6"]",
            isRequired = true,
            mustBePositive = true
        });

        // Phase 3: Product and Traction (Operations)
        await AddField(new {
            templateId = 34,
            stageNumber = 3,
            fieldOrder = 0,
            label = "_localizer["auto.Program.bd8bce5d"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.47823d3c"]",
            isRequired = true,
            minLength = 100
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 3,
            fieldOrder = 1,
            label = "_localizer["auto.Program.45b303b8"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.28daf891"]",
            isRequired = true,
            minLength = 50
        });

        // Phase 4: Competitive Landscape (Market & Strategy)
        await AddField(new {
            templateId = 34,
            stageNumber = 4,
            fieldOrder = 0,
            label = "_localizer["auto.Program.c8b4ecb9"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.1dc298d0"]",
            isRequired = true,
            minLength = 50
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 4,
            fieldOrder = 1,
            label = "_localizer["auto.Program.d540fa44"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.ab944a8b"]",
            isRequired = true,
            minLength = 100
        });

        // Phase 5: The Masterminds (Industry-Specific)
        await AddField(new {
            templateId = 34,
            stageNumber = 5,
            fieldOrder = 0,
            label = "_localizer["auto.Program.09b57574"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.a21d25dc"]",
            isRequired = true,
            minLength = 150
        });

        await AddField(new {
            templateId = 34,
            stageNumber = 5,
            fieldOrder = 1,
            label = "_localizer["auto.Program.de325949"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.a31661bf"]",
            isRequired = false
        });

        Console.WriteLine("_localizer["auto.Program.e895da8e"]");
    }

    static async Task AddMarketOpportunityAnalyzerFields()
    {
        Console.WriteLine("Adding fields for AI-Based Market Opportunity Analyzer (Template 35)...");

        // Phase 1: Defining the Company (Basic Information)
        await AddField(new {
            templateId = 35,
            stageNumber = 1,
            fieldOrder = 0,
            label = "_localizer["auto.Program.e7b47c58"]",
            inputType = "_localizer["auto.Program.1cb251ec"]",
            rationale = "_localizer["auto.Program.053409e5"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 1,
            fieldOrder = 1,
            label = "_localizer["auto.Program.6df73ff7"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "_localizer["auto.Program.f33ff08d"]",
            rationale = "_localizer["auto.Program.841c71da"]",
            isRequired = true
        });

        // Phase 2: Company Financial Capacity (Financial Details)
        await AddField(new {
            templateId = 35,
            stageNumber = 2,
            fieldOrder = 0,
            label = "_localizer["auto.Program.19c63927"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.df13ab6d"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 2,
            fieldOrder = 1,
            label = "_localizer["auto.Program.9eb4674f"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.096e8b4b"]",
            isRequired = true,
            mustBePositive = true
        });

        // Phase 3: Core Competencies (Operations)
        await AddField(new {
            templateId = 35,
            stageNumber = 3,
            fieldOrder = 0,
            label = "_localizer["auto.Program.8cf6cff4"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.8762e0d9"]",
            isRequired = true,
            minLength = 100
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 3,
            fieldOrder = 1,
            label = "_localizer["auto.Program.71c072e8"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.cf76f83c"]",
            isRequired = true,
            minLength = 50
        });

        // Phase 4: Current Strategic Position (Market & Strategy)
        await AddField(new {
            templateId = 35,
            stageNumber = 4,
            fieldOrder = 0,
            label = "_localizer["auto.Program.48775719"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.dd801db8"]",
            isRequired = true,
            minLength = 100
        });

        // Phase 5: Market Opportunity Assessment (Industry-Specific)
        await AddField(new {
            templateId = 35,
            stageNumber = 5,
            fieldOrder = 0,
            label = "Description of the Target Market Opportunity/Segment",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.93a6dc84"]",
            isRequired = true,
            minLength = 100
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 5,
            fieldOrder = 1,
            label = "_localizer["auto.Program.a86fbf94"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.fac210be"]",
            isRequired = true,
            mustBePositive = true
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 5,
            fieldOrder = 2,
            label = "_localizer["auto.Program.61cc67e2"]",
            inputType = "number",
            rationale = "_localizer["auto.Program.aac3d999"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 5,
            fieldOrder = 3,
            label = "_localizer["auto.Program.84fc321d"]",
            inputType = "_localizer["auto.Program.ad973c25"]",
            fieldOptions = "[\"0-2\",\"3-5\",\"6-10\",\"+10\"]",
            rationale = "_localizer["auto.Program.a9c81f1b"]",
            isRequired = true
        });

        await AddField(new {
            templateId = 35,
            stageNumber = 5,
            fieldOrder = 4,
            label = "_localizer["auto.Program.1120894c"]",
            inputType = "_localizer["auto.Program.6394d816"]",
            rationale = "_localizer["auto.Program.f30d9f9b"]",
            isRequired = true,
            minLength = 50
        });

        Console.WriteLine("AI-Based Market Opportunity Analyzer fields added successfully!");
    }

    static async Task AddField(dynamic fieldData)
    {
        var json = JsonSerializer.Serialize(fieldData);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        try
        {
            var response = await client.PostAsync("https://b26db2dd6336.ngrok-free.app/api/templatefields", content);
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error adding field: {response.StatusCode}");
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error details: {errorContent}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception adding field: {ex.Message}");
        }
    }
}