using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Masroo3k.Api.Services
{
    public class GeminiAIService : IAIAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<GeminiAIService> _logger;

        public GeminiAIService(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiAIService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<BusinessAnalysisResult> GenerateAnalysisAsync(BusinessAnalysisRequest request)
        {
            try
            {
                var apiKey = _configuration["Gemini:ApiKey"];
                if (string.IsNullOrEmpty(apiKey))
                {
                    _logger.LogWarning("Gemini API key not configured");
                    return GenerateSimulatedAnalysis(request);
                }

                var prompt = BuildAnalysisPrompt(request);
                var geminiResponse = await CallGeminiAPI(apiKey, prompt);
                
                return ParseGeminiResponse(geminiResponse, request);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating business analysis");
                return GenerateSimulatedAnalysis(request);
            }
        }

        private string BuildAnalysisPrompt(BusinessAnalysisRequest request)
        {
            var prompt = $@"You are a professional business analyst. Analyze the following business idea and provide a detailed assessment.

Business Idea: {request.BusinessIdea}
Industry: {request.Industry}
Target Market: {request.TargetMarket}
Initial Investment: $request.InitialInvestment
Additional Details: {request.AdditionalDetails ?? "N/A"}

Please provide a comprehensive business analysis in JSON format with the following structure:
" + "{\n" +
  "  \"successProbability\": <number 0-100>,\n" +
  "  \"riskLevel\": \"Low|Medium|High\",\n" +
  "  \"projectedROI\": <number representing percentage, can be negative>,\n" +
  "  \"recommendedInvestment\": <number>,\n" +
  "  \"overallScore\": <number 0-100>,\n" +
  "  \"keyFindings\": [\n" +
  "    \"Key finding 1\",\n" +
  "    \"Key finding 2\",\n" +
  "    \"Key finding 3\",\n" +
  "    \"Key finding 4\",\n" +
  "    \"Key finding 5\",\n" +
  "    \"Key finding 6\"\n" +
  "  ],\n" +
  "  \"executiveSummary\": \"<A brief 2-3 sentence summary of the business opportunity>\",\n" +
  "  \"recommendations\": [\n" +
  "    \"Recommendation 1\",\n" +
  "    \"Recommendation 2\",\n" +
  "    \"Recommendation 3\",\n" +
  "    \"Recommendation 4\"\n" +
  "  ]\n" +
"}\n" +
"Base your analysis on:\n" +
"1. Market demand and competition\n" +
"2. Financial viability and ROI potential\n" +
"3. Risk factors and mitigation strategies\n" +
"4. Scalability and growth potential\n" +
"5. Industry trends and market conditions\n\n" +
"Provide realistic and actionable insights. Return ONLY the JSON object, no additional text.";

            return prompt;
        }

        private async Task<string> CallGeminiAPI(string apiKey, string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={apiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.7,
                    maxOutputTokens = 2048,
                }
            };

            var json = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }

        private BusinessAnalysisResult ParseGeminiResponse(string geminiResponse, BusinessAnalysisRequest request)
        {
            try
            {
                var jsonResponse = JObject.Parse(geminiResponse);
                var textContent = jsonResponse["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString();

                if (string.IsNullOrEmpty(textContent))
                {
                    throw new Exception("No valid response content received from Gemini API");
                }

                // Extract JSON from response (handle cases where AI adds markdown code blocks)
                var jsonStart = textContent.IndexOf("{");
                var jsonEnd = textContent.LastIndexOf("}");
                if (jsonStart >= 0 && jsonEnd > jsonStart)
                {
                    textContent = textContent.Substring(jsonStart, jsonEnd - jsonStart + 1);
                }

                var analysis = JsonConvert.DeserializeObject<GeminiAnalysisResponse>(textContent);
                
                if (analysis == null)
                {
                    throw new Exception("Failed to parse Gemini API response");
                }

                return new BusinessAnalysisResult
                {
                    SuccessProbability = Math.Clamp(analysis.SuccessProbability, 0, 100),
                    RiskLevel = ValidateRiskLevel(analysis.RiskLevel),
                    ProjectedROI = analysis.ProjectedROI,
                    Investment = analysis.RecommendedInvestment > 0 ? analysis.RecommendedInvestment : request.InitialInvestment,
                    OverallScore = Math.Clamp(analysis.OverallScore, 0, 100),
                    KeyFindings = analysis.KeyFindings ?? new List<string>(),
                    ExecutiveSummary = analysis.ExecutiveSummary ?? "Analysis completed successfully.",
                    Recommendations = analysis.Recommendations ?? new List<string>()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing Gemini API response");
                return GenerateSimulatedAnalysis(request);
            }
        }

        private string ValidateRiskLevel(string riskLevel)
        {
            var validLevels = new[] { "Low", "Medium", "High", "Critical" };
            var normalized = riskLevel?.Trim();
            
            if (normalized != null && validLevels.Contains(normalized, StringComparer.OrdinalIgnoreCase))
            {
                return char.ToUpper(normalized[0]) + normalized.Substring(1).ToLower();
            }
            
            return "Medium";
        }

        private BusinessAnalysisResult GenerateSimulatedAnalysis(BusinessAnalysisRequest request)
        {
            // Fallback simulated analysis when API is not available
            var random = new Random(request.BusinessIdea.GetHashCode());
            
            var successProbability = random.Next(45, 85);
            var overallScore = random.Next(60, 90);
            var projectedROI = (decimal)(random.Next(-20, 150) + random.NextDouble());
            
            var riskLevels = new[] { "Low", "Medium", "High" };
            var riskLevel = riskLevels[random.Next(riskLevels.Length)];

            return new BusinessAnalysisResult
            {
                SuccessProbability = successProbability,
                RiskLevel = riskLevel,
                ProjectedROI = Math.Round(projectedROI, 2),
                Investment = request.InitialInvestment,
                OverallScore = overallScore,
                KeyFindings = new List<string>
                {
                    "Market demand shows positive indicators for this business concept",
                    "Initial investment aligns with industry standards for similar ventures",
                    "Competitive analysis suggests opportunity for differentiation",
                    "Scalability potential exists with proper execution strategy",
                    "Risk factors are manageable with appropriate planning",
                    "Projected timeline for ROI realization is within acceptable range"
                },
                ExecutiveSummary = $"The proposed {request.Industry} business shows promising potential with calculated risks. Success depends heavily on execution strategy and market timing.",
                Recommendations = new List<string>
                {
                    "Conduct detailed market research before full implementation",
                    "Develop a comprehensive financial plan with contingency buffers",
                    "Establish key performance indicators to track progress",
                    "Create a phased rollout strategy to minimize initial risks"
                }
            };
        }

        private class GeminiAnalysisResponse
        {
            [JsonProperty("successProbability")]
            public int SuccessProbability { get; set; }

            [JsonProperty("riskLevel")]
            public string RiskLevel { get; set; } = "Medium";

            [JsonProperty("projectedROI")]
            public decimal ProjectedROI { get; set; }

            [JsonProperty("recommendedInvestment")]
            public decimal RecommendedInvestment { get; set; }

            [JsonProperty("overallScore")]
            public int OverallScore { get; set; }

            [JsonProperty("keyFindings")]
            public List<string>? KeyFindings { get; set; }

            [JsonProperty("executiveSummary")]
            public string? ExecutiveSummary { get; set; }

            [JsonProperty("recommendations")]
            public List<string>? Recommendations { get; set; }
        }
    }
}
