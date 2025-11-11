import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, CheckCircle, TrendingUp, Shield, Award, BarChart3, AlertTriangle, DollarSign, Target, Lightbulb } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { getAnalysisById } from '../services/analysisService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Tab = 't("auto.Report.a573d92b")' | 't("auto.Report.a2fdd734")' | 't("auto.Report.3177ea52")' | 't("auto.Report.5259ae4a")' | 't("auto.Report.0139c29e")';
type RiskLevel = 't("auto.Report.28d0edd0")' | 't("auto.Report.87f8a6ab")' | 't("auto.Report.655d20c1")' | 'Critical';

const COLORS = ['#28a745', '#0066cc', '#ffc107', '#dc3545', '#6f42c1'];

const riskStyles = {
    t("auto.Report.28d0edd0"): { text: 'text-green-600', bg: 'bg-green-100', value: 25 },
    t("auto.Report.87f8a6ab"): { text: 'text-yellow-600', bg: 'bg-yellow-100', value: 50 },
    t("auto.Report.655d20c1"): { text: 'text-orange-600', bg: 'bg-orange-100', value: 75 },
    Critical: { text: 'text-red-600', bg: 'bg-red-100', value: 100 },
};
const priorityStyles = {
    t("auto.Report.655d20c1"): 'bg-red-50 border-red-200',
    t("auto.Report.87f8a6ab"): 'bg-yellow-50 border-yellow-200',
    t("auto.Report.28d0edd0"): 'bg-green-50 border-green-200'
}

const Report: React.FC = () => {
  const { language } = useLanguage();
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('Executive Summary');
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState<any>(null);
    const reportRef = useRef<HTMLDivElement>(null);
    const [pdfExportMode, setPdfExportMode] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || undefined;
        if (id) {
            getAnalysisById(id, token)
                .then(res => {
                    setAnalysis(res);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to load report', err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    const exportToPDF = async () => {
        if (!reportRef.current || !analysis) return;
        
        // Enable PDF export mode
        setPdfExportMode(true);
        
        // Wait for re-render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        try {
            const reportElement = reportRef.current;
            
            // Create PDF
            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollY: -window.scrollY
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth - 20; // Add some margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 15; // Start position with some top margin
            
            // Add title page
            pdf.setFontSize(22);
            pdf.text('Business Analysis Report', pageWidth / 2, 30, { align: 'center' });
            
            pdf.setFontSize(16);
            pdf.text(analysis.title || 'Untitled Report', pageWidth / 2, 45, { align: 'center' });
            
            pdf.setFontSize(12);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 55, { align: 'center' });
            
            pdf.setFontSize(14);
            pdf.text(`t("auto.Report.9cf6d0d6"): ${analysis.score}/100`, pageWidth / 2, 70, { align: 'center' });
            
            // Add content image on next page
            pdf.addPage();
            
            // Add content image
            if (imgHeight < pageHeight) {
                // Content fits on one page
                pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);
            } else {
                // Content spans multiple pages
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                // Add new pages if content is taller than one page
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
            }
            
            // Save the PDF
            pdf.save(`Business-Analysis-Report-${analysis?.title || id || 'unknown'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            // Disable PDF export mode
            setPdfExportMode(false);
        }
    };

    // Generate dynamic financial projections based on AI data
    const generateFinancialProjections = () => {
        if (!analysis) return [];
        
        const baseRevenue = analysis.investment * 2; // Starting revenue assumption
        const growthRate = Math.max(0.15, (analysis.successPercent / 100) * 0.3); // Growth based on success rate
        const profitMargin = (analysis.expectedROI / 100) * 0.5; // Profit margin from ROI
        
        return Array.from({ length: 5 }, (_, i) => {
            const year = i + 1;
            const revenue = baseRevenue * Math.pow(1 + growthRate, i);
            const expenses = revenue * (1 - profitMargin - (i * 0.05)); // Decreasing expense ratio
            const profit = revenue - expenses;
            const roi = (profit / analysis.investment) * 100;
            
            return {
                year: `Year ${year}`,
                revenue: Math.round(revenue),
                expenses: Math.round(expenses),
                profit: Math.round(profit),
                roi: Math.round(roi * 10) / 10
            };
        });
    };

    // Generate risk assessment data
    const generateRiskAssessment = () => {
        if (!analysis) return [];
        
        const riskLevel = analysis.riskLevel || 't("auto.Report.87f8a6ab")';
        const risks = [
            {
                risk: 't("auto.Report.27684e08")',
                level: riskLevel,
                score: riskStyles[riskLevel as RiskLevel]?.value || 50,
                description: 't("auto.Report.7fc6813c")',
                mitigation: 't("auto.Report.8f43b89d")'
            },
            {
                risk: 't("auto.Report.df4fcb25")',
                level: analysis.expectedROI < 0 ? 't("auto.Report.655d20c1")' : analysis.expectedROI > 50 ? 't("auto.Report.28d0edd0")' : 't("auto.Report.87f8a6ab")',
                score: analysis.expectedROI < 0 ? 75 : analysis.expectedROI > 50 ? 25 : 50,
                description: 't("auto.Report.7c6affd5")',
                mitigation: 't("auto.Report.cf04123e")'
            },
            {
                risk: 't("auto.Report.c432e51e")',
                level: analysis.successPercent > 70 ? 't("auto.Report.28d0edd0")' : analysis.successPercent > 50 ? 't("auto.Report.87f8a6ab")' : 't("auto.Report.655d20c1")',
                score: analysis.successPercent > 70 ? 25 : analysis.successPercent > 50 ? 50 : 75,
                description: 't("auto.Report.e2ec9c9e")',
                mitigation: 't("auto.Report.56d3e022")'
            },
            {
                risk: 't("auto.Report.decc5532")',
                level: 't("auto.Report.28d0edd0")',
                score: 25,
                description: 't("auto.Report.9c952070")',
                mitigation: 't("auto.Report.c0cc525f")'
            }
        ];
        
        return risks;
    };

    // Generate recommendations based on AI analysis
    const generatet("auto.Report.5259ae4a") = () => {
        if (!analysis || !analysis.recommendations) return [];
        
        return analysis.recommendations.map((rec: string, index: number) => ({
            priority: index === 0 ? 't("auto.Report.655d20c1")' : index === 1 ? 't("auto.Report.655d20c1")' : 't("auto.Report.87f8a6ab")',
            title: rec.split('.')[0] || rec.substring(0, 50),
            impact: Math.round(8 + Math.random() * 2),
            category: index % 3 === 0 ? 't("auto.Report.83de191c")' : index % 3 === 1 ? 't("auto.Report.456d0deb")' : 't("auto.Report.c482980d")',
            description: rec
        }));
    };

    // Generate benchmarks data
    const generatet("auto.Report.0139c29e") = () => {
        if (!analysis) return [];
        
        return [
            {
                name: 't("auto.Report.01596674")',
                yourValue: analysis.successPercent || 50,
                industryAverage: 55,
                topPerformers: 85,
                unit: '%'
            },
            {
                name: 't("auto.Report.14eba957")',
                yourValue: Math.abs(analysis.expectedROI || 0),
                industryAverage: 25,
                topPerformers: 60,
                unit: '%'
            },
            {
                name: 't("auto.Report.9cf6d0d6")',
                yourValue: analysis.score || 50,
                industryAverage: 65,
                topPerformers: 90,
                unit: '/100'
            },
            {
                name: 't("auto.Report.b72031e9")',
                yourValue: 100 - (riskStyles[analysis.riskLevel as RiskLevel]?.value || 50),
                industryAverage: 60,
                topPerformers: 85,
                unit: '/100'
            }
        ];
    };

    const financialData = React.useMemo(() => generateFinancialProjections(), [analysis]);
    const riskData = React.useMemo(() => generateRiskAssessment(), [analysis]);
    const recommendations = React.useMemo(() => generatet("auto.Report.5259ae4a")(), [analysis]);
    const benchmarks = React.useMemo(() => generatet("auto.Report.0139c29e")(), [analysis]);

    const renderContent = () => {
        // In PDF export mode, render all tabs
        if (pdfExportMode) {
            return (
                <div className="t("auto.Report.c219ab9c")">
                    {/* t("auto.Report.a573d92b") */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">t("auto.Report.a573d92b")</h2>
                        <div className="t("auto.Report.ae382999")">
                            {analysis.executiveSummary && (
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-blue-600" />
                                        t("auto.Report.a573d92b")
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{analysis.executiveSummary}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Findings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(analysis.keyFindings || []).map((finding: string, i: number) => (
                                        <div key={i} className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">{finding}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Target className="w-8 h-8 text-green-600" />
                                        <h4 className="font-bold text-lg">Success Rate</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-green-700 mb-2">{analysis.successPercent}%</p>
                                    <p className="text-sm text-gray-600">Probability of achieving business goals</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <TrendingUp className="w-8 h-8 text-blue-600" />
                                        <h4 className="font-bold text-lg">ROI Projection</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-blue-700 mb-2">{analysis.expectedROI}%</p>
                                    <p className="text-sm text-gray-600">Expected return on investment</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <DollarSign className="w-8 h-8 text-purple-600" />
                                        <h4 className="font-bold text-lg">Investment</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-purple-700 mb-2">${analysis.investment.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">Required capital investment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* t("auto.Report.a2fdd734") */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">t("auto.Report.a2fdd734")</h2>
                        <div className="t("auto.Report.ae382999")">
                            <div>
                                <h3 className="text-xl font-bold mb-4">5-Year Revenue & Profit Projections</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={financialData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="t("auto.Report.0d9646ba")" />
                                        <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                        <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                        <Tooltip 
                                            formatter={(value: any) => `$${value.toLocaleString()}`}
                                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                                        />
                                        <Legend />
                                        <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.67362dfb")" stroke="t("auto.Report.c8a0f540")" strokeWidth={3} name="t("auto.Report.54358a91")" />
                                        <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.603af891")" stroke="t("auto.Report.681f8cc7")" strokeWidth={3} name="t("auto.Report.13495828")" />
                                        <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.8cb55412")" stroke="t("auto.Report.056051c1")" strokeWidth={3} name="t("auto.Report.182875b6")" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Financial Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">Year</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">Revenue</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">Expenses</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">Profit</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">ROI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {financialData.map((row, i) => (
                                                <tr key={i} className="border-b hover:bg-gray-50">
                                                    <td className="p-3 font-medium">{row.year}</td>
                                                    <td className="p-3 text-green-600 font-semibold">${row.revenue.toLocaleString()}</td>
                                                    <td className="p-3 text-red-500">${row.expenses.toLocaleString()}</td>
                                                    <td className={`p-3 font-semibold ${row.profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        ${row.profit.toLocaleString()}
                                                    </td>
                                                    <td className={`p-3 font-semibold ${row.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {row.roi}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold mb-4">Revenue Growth Chart</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="t("auto.Report.67362dfb")" fill="t("auto.Report.c8a0f540")" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold mb-4">Profit Trend</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="t("auto.Report.8cb55412")" fill="t("auto.Report.056051c1")" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* t("auto.Report.3177ea52") */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">t("auto.Report.3177ea52")</h2>
                        <div className="t("auto.Report.ae382999")">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Risk Analysis Overview</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={riskData}>
                                        <PolarGrid stroke="t("auto.Report.0d9646ba")" />
                                        <PolarAngleAxis dataKey="t("auto.Report.c6142b27")" stroke="#666" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                                        <Radar name="t("report.riskLevel")" dataKey="score" stroke="t("auto.Report.681f8cc7")" fill="t("auto.Report.681f8cc7")" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="t("auto.CreateField.028d2a3b")">
                                <h3 className="text-xl font-bold">t("auto.Report.3177ea52") Matrix</h3>
                                {riskData.map((item, i) => (
                                    <div key={i} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertTriangle className={`w-5 h-5 ${riskStyles[item.level as RiskLevel].text}`}/>
                                            <h4 className="font-bold text-lg">{item.risk}</h4>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ms-auto ${riskStyles[item.level as RiskLevel].bg} ${riskStyles[item.level as RiskLevel].text}`}>
                                                {item.level}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <h5 className="font-semibold text-sm mb-2 text-green-800">💡 Mitigation t("auto.Report.83de191c")</h5>
                                            <p className="text-sm text-gray-700">{item.mitigation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* t("auto.Report.5259ae4a") */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">t("auto.Report.5259ae4a")</h2>
                        <div className="t("auto.Report.ae382999")">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Strategic t("auto.Report.5259ae4a")</h3>
                                <p className="text-gray-600 mb-6">AI-generated actionable insights to maximize success probability and mitigate risks.</p>
                            </div>
                            <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                {recommendations.map((item, i) => (
                                    <div key={i} className={`border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                                        item.priority === 't("auto.Report.655d20c1")' ? 'border-red-500 bg-red-50' : 
                                        item.priority === 't("auto.Report.87f8a6ab")' ? 'border-yellow-500 bg-yellow-50' : 
                                        'border-green-500 bg-green-50'
                                    }`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="t("auto.TemplateBuilder.f8d822a6")">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                                                        item.priority === 't("auto.Report.655d20c1")' ? 'bg-red-200 text-red-800' : 
                                                        item.priority === 't("auto.Report.87f8a6ab")' ? 'bg-yellow-200 text-yellow-800' : 
                                                        'bg-green-200 text-green-800'
                                                    }`}>
                                                        {item.priority} PRIORITY
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                            <div className="text-center ms-6 bg-white p-4 rounded-lg shadow-sm">
                                                <p className="text-gray-500 text-xs mb-1">Impact Score</p>
                                                <p className="text-3xl font-bold text-primary-green">{item.impact}<span className="text-sm text-gray-400">/10</span></p>
                                            </div>
                                        </div>
                                        <div className="t("auto.Report.7335a003")">
                                            <span className="text-xs font-semibold bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-300">
                                                📂 {item.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* t("auto.Report.0139c29e") */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">t("auto.Report.0139c29e")</h2>
                        <div className="t("auto.Report.ae382999")">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Industry Performance t("auto.Report.0139c29e")</h3>
                                <p className="text-gray-600 mb-6">Compare your business metrics against industry averages and top performers.</p>
                            </div>
                            {benchmarks.map((item, i) => (
                                <div key={i} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold mb-6 text-lg">{item.name}</h4>
                                    <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Your Business</span>
                                            <span className="font-bold text-2xl text-primary-green">{item.yourValue}{item.unit}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-primary-green to-green-600 h-4 rounded-full transition-all duration-500"
                                                style={{width: `${Math.min((item.yourValue / item.topPerformers) * 100, 100)}%`}}
                                            ></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">Your Value</p>
                                                <p className="font-bold text-primary-green">{item.yourValue}{item.unit}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">Industry Avg</p>
                                                <p className="font-bold text-gray-600">{item.industryAverage}{item.unit}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-1">Top Performers</p>
                                                <p className="font-bold text-blue-600">{item.topPerformers}{item.unit}</p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg mt-4">
                                            <p className="text-xs text-gray-700">
                                                {item.yourValue >= item.topPerformers ? '🎉 Excellent! You are performing at top tier level.' :
                                                 item.yourValue >= item.industryAverage ? '👍 Good! You are above industry average.' :
                                                 't("auto.Report.b37be9d8")'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                                <h4 className="font-bold mb-3">Overall Performance Summary</h4>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={benchmarks}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="t("auto.DeveloperTools.b068931c")" stroke="#666" angle={-15} textAnchor="t("auto.Report.7f021a14")" height={100} />
                                        <YAxis stroke="#666" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="t("auto.Report.31057e9b")" fill="t("auto.Report.c8a0f540")" name="t("auto.Report.c1572799")" />
                                        <Bar dataKey="t("auto.Report.67125694")" fill="t("auto.Report.53990c72")" name="t("auto.Report.29312841")" />
                                        <Bar dataKey="t("auto.Report.6ffbd378")" fill="t("auto.Report.056051c1")" name="t("auto.Report.a95ec5cf")" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        // Normal tab-based rendering
        switch(activeTab) {
            case 't("auto.Report.a573d92b")': return (
                <div className="t("auto.Report.ae382999")">
                    {analysis.executiveSummary && (
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-blue-600" />
                                t("auto.Report.a573d92b")
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{analysis.executiveSummary}</p>
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Key Findings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(analysis.keyFindings || []).map((finding: string, i: number) => (
                                <div key={i} className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <p className="text-sm text-gray-700">{finding}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 text-green-600" />
                                <h4 className="font-bold text-lg">Success Rate</h4>
                            </div>
                            <p className="text-4xl font-bold text-green-700 mb-2">{analysis.successPercent}%</p>
                            <p className="text-sm text-gray-600">Probability of achieving business goals</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                                <h4 className="font-bold text-lg">ROI Projection</h4>
                            </div>
                            <p className="text-4xl font-bold text-blue-700 mb-2">{analysis.expectedROI}%</p>
                            <p className="text-sm text-gray-600">Expected return on investment</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-3 mb-4">
                                <DollarSign className="w-8 h-8 text-purple-600" />
                                <h4 className="font-bold text-lg">Investment</h4>
                            </div>
                            <p className="text-4xl font-bold text-purple-700 mb-2">${analysis.investment.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Required capital investment</p>
                        </div>
                    </div>
                </div>
            );
            case 't("auto.Report.a2fdd734")': return (
                <div className="t("auto.Report.ae382999")">
                    <div>
                        <h3 className="text-xl font-bold mb-4">5-Year Revenue & Profit Projections</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={financialData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="t("auto.Report.0d9646ba")" />
                                <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                <Tooltip 
                                    formatter={(value: any) => `$${value.toLocaleString()}`}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                                />
                                <Legend />
                                <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.67362dfb")" stroke="t("auto.Report.c8a0f540")" strokeWidth={3} name="t("auto.Report.54358a91")" />
                                <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.603af891")" stroke="t("auto.Report.681f8cc7")" strokeWidth={3} name="t("auto.Report.13495828")" />
                                <Line type="t("auto.Report.615d163c")" dataKey="t("auto.Report.8cb55412")" stroke="t("auto.Report.056051c1")" strokeWidth={3} name="t("auto.Report.182875b6")" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Financial Breakdown</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 font-semibold border-b-2 border-gray-300">Year</th>
                                        <th className="p-3 font-semibold border-b-2 border-gray-300">Revenue</th>
                                        <th className="p-3 font-semibold border-b-2 border-gray-300">Expenses</th>
                                        <th className="p-3 font-semibold border-b-2 border-gray-300">Profit</th>
                                        <th className="p-3 font-semibold border-b-2 border-gray-300">ROI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financialData.map((row, i) => (
                                        <tr key={i} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{row.year}</td>
                                            <td className="p-3 text-green-600 font-semibold">${row.revenue.toLocaleString()}</td>
                                            <td className="p-3 text-red-500">${row.expenses.toLocaleString()}</td>
                                            <td className={`p-3 font-semibold ${row.profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                ${row.profit.toLocaleString()}
                                            </td>
                                            <td className={`p-3 font-semibold ${row.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {row.roi}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-4">Revenue Growth Chart</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                    <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                    <Bar dataKey="t("auto.Report.67362dfb")" fill="t("auto.Report.c8a0f540")" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-4">Profit Trend</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="t("auto.Report.84cdc76c")" stroke="#666" />
                                    <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} stroke="#666" />
                                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                    <Bar dataKey="t("auto.Report.8cb55412")" fill="t("auto.Report.056051c1")" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
            case 't("auto.Report.3177ea52")': return (
                <div className="t("auto.Report.ae382999")">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Risk Analysis Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={riskData}>
                                <PolarGrid stroke="t("auto.Report.0d9646ba")" />
                                <PolarAngleAxis dataKey="t("auto.Report.c6142b27")" stroke="#666" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                                <Radar name="t("report.riskLevel")" dataKey="score" stroke="t("auto.Report.681f8cc7")" fill="t("auto.Report.681f8cc7")" fillOpacity={0.6} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="t("auto.CreateField.028d2a3b")">
                        <h3 className="text-xl font-bold">t("auto.Report.3177ea52") Matrix</h3>
                        {riskData.map((item, i) => (
                            <div key={i} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className={`w-5 h-5 ${riskStyles[item.level as RiskLevel].text}`}/>
                                    <h4 className="font-bold text-lg">{item.risk}</h4>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ms-auto ${riskStyles[item.level as RiskLevel].bg} ${riskStyles[item.level as RiskLevel].text}`}>
                                        {item.level}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h5 className="font-semibold text-sm mb-2 text-green-800">💡 Mitigation t("auto.Report.83de191c")</h5>
                                    <p className="text-sm text-gray-700">{item.mitigation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 't("auto.Report.5259ae4a")': return (
                <div className="t("auto.Report.ae382999")">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Strategic t("auto.Report.5259ae4a")</h3>
                        <p className="text-gray-600 mb-6">AI-generated actionable insights to maximize success probability and mitigate risks.</p>
                    </div>
                    <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                        {recommendations.map((item, i) => (
                            <div key={i} className={`border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                                item.priority === 't("auto.Report.655d20c1")' ? 'border-red-500 bg-red-50' : 
                                item.priority === 't("auto.Report.87f8a6ab")' ? 'border-yellow-500 bg-yellow-50' : 
                                'border-green-500 bg-green-50'
                            }`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="t("auto.TemplateBuilder.f8d822a6")">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                                                item.priority === 't("auto.Report.655d20c1")' ? 'bg-red-200 text-red-800' : 
                                                item.priority === 't("auto.Report.87f8a6ab")' ? 'bg-yellow-200 text-yellow-800' : 
                                                'bg-green-200 text-green-800'
                                            }`}>
                                                {item.priority} PRIORITY
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="text-center ms-6 bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-xs mb-1">Impact Score</p>
                                        <p className="text-3xl font-bold text-primary-green">{item.impact}<span className="text-sm text-gray-400">/10</span></p>
                                    </div>
                                </div>
                                <div className="t("auto.Report.7335a003")">
                                    <span className="text-xs font-semibold bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-300">
                                        📂 {item.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 't("auto.Report.0139c29e")': return (
                <div className="t("auto.Report.ae382999")">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Industry Performance t("auto.Report.0139c29e")</h3>
                        <p className="text-gray-600 mb-6">Compare your business metrics against industry averages and top performers.</p>
                    </div>
                    {benchmarks.map((item, i) => (
                        <div key={i} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-6 text-lg">{item.name}</h4>
                            <div className="t("auto.Step1_BasicInfo.eeefd75c")">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Your Business</span>
                                    <span className="font-bold text-2xl text-primary-green">{item.yourValue}{item.unit}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-primary-green to-green-600 h-4 rounded-full transition-all duration-500"
                                        style={{width: `${Math.min((item.yourValue / item.topPerformers) * 100, 100)}%`}}
                                    ></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">Your Value</p>
                                        <p className="font-bold text-primary-green">{item.yourValue}{item.unit}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">Industry Avg</p>
                                        <p className="font-bold text-gray-600">{item.industryAverage}{item.unit}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">Top Performers</p>
                                        <p className="font-bold text-blue-600">{item.topPerformers}{item.unit}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg mt-4">
                                    <p className="text-xs text-gray-700">
                                        {item.yourValue >= item.topPerformers ? '🎉 Excellent! You are performing at top tier level.' :
                                         item.yourValue >= item.industryAverage ? '👍 Good! You are above industry average.' :
                                         't("auto.Report.b37be9d8")'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-bold mb-3">Overall Performance Summary</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={benchmarks}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="t("auto.DeveloperTools.b068931c")" stroke="#666" angle={-15} textAnchor="t("auto.Report.7f021a14")" height={100} />
                                <YAxis stroke="#666" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="t("auto.Report.31057e9b")" fill="t("auto.Report.c8a0f540")" name="t("auto.Report.c1572799")" />
                                <Bar dataKey="t("auto.Report.67125694")" fill="t("auto.Report.53990c72")" name="t("auto.Report.29312841")" />
                                <Bar dataKey="t("auto.Report.6ffbd378")" fill="t("auto.Report.056051c1")" name="t("auto.Report.a95ec5cf")" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );
            default: return null;
        }
    }

    // Add loading and error handling
    if (loading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading report...</p>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Analysis not found</p>
                    <button onClick={() => navigate('/my-analyses')} className="text-primary-green hover:underline">Back to Analyses</button>
                </div>
            </div>
        );
    }

    const tabs: {name: Tab, icon: React.ElementType}[] = [
        { name: 't("auto.Report.a573d92b")', icon: Award },
        { name: 't("auto.Report.a2fdd734")', icon: TrendingUp },
        { name: 't("auto.Report.3177ea52")', icon: Shield },
        { name: 't("auto.Report.5259ae4a")', icon: BarChart3 },
        { name: 't("auto.Report.0139c29e")', icon: BarChart3 },
    ];

    const StatCard = ({ title, value, icon: Icon, change }: {title: string, value: string, icon: React.ElementType, change?: number}) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${riskStyles.t("auto.Report.28d0edd0").bg}`}>
                    <Icon className={`w-5 h-5 ${riskStyles.t("auto.Report.28d0edd0").text}`} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-xl font-bold text-gray-800">{value}</p>
                </div>
                 {change && <TrendingUp className="w-5 h-5 text-gray-400 ms-auto" />}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto">
            <button onClick={() => navigate('/my-analyses')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft size={16} /> Back to Analyses
            </button>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{analysis.title}</h1>
                    <p className="text-gray-500">Business Analysis Report • {new Date(analysis.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="t("auto.AdminLogs.9edfbb10")">
                    <button onClick={exportToPDF} className="h-10 px-4 border border-gray-300 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-gray-100"><Download size={16} /> Export PDF</button>
                    <button className="h-10 px-4 border border-gray-300 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-gray-100"><Share2 size={16} /> Share</button>
                </div>
            </div>
            <div ref={reportRef}>
            <div className="bg-green-50/50 p-6 rounded-lg border border-green-200 mb-8">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-600">t("auto.Report.9cf6d0d6")</p>
                    <p className="text-4xl font-bold text-primary-green">{analysis.score}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="t("report.successProbability")" value={`${analysis.successPercent}%`} icon={CheckCircle} />
                <StatCard title="t("report.riskLevel")" value={analysis.riskLevel} icon={Shield} />
                <StatCard title="t("report.projectedROI")" value={`${analysis.expectedROI}%`} icon={TrendingUp} change={analysis.expectedROI} />
                <StatCard title="t("report.investment")" value={`$${analysis.investment.toLocaleString()}`} icon={Award} />
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-semibold border-b-2 ${activeTab === tab.name ? 'border-primary-green text-primary-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                           <tab.icon size={16} /> {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
                {renderContent()}
            </div>
            </div>
             <div className="mt-8 flex justify-center gap-4">
                <button className="h-11 px-6 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">Start New Analysis</button>
                <button className="h-11 px-6 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50">Schedule Consultation</button>
            </div>
        </div>
    );
};

export default Report;