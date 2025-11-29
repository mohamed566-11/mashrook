import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, CheckCircle, TrendingUp, Shield, Award, BarChart3, AlertTriangle, DollarSign, Target, Lightbulb } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { getAnalysisById } from '../services/analysisService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Add Tag component
const Tag: React.FC<{ color?: string; className?: string; children?: React.ReactNode }> = ({ color = '#e0e0e0', className = '', children }) => (
    <span className={className} style={{ backgroundColor: color, padding: '2px 8px', borderRadius: '4px' }}>{children}</span>
);

// Add CSS class for benchmark bars
const BenchmarkBar: React.FC<{
    yourValue: number;
    industryAverage: number;
    className?: string;
}> = ({ yourValue, industryAverage, className = '' }) => {
    const width = Math.min(100, (yourValue / industryAverage) * 100);
    const barColor = yourValue > industryAverage ? 'bg-green-500' :
        yourValue < industryAverage ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${barColor} ${className}`}
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
};

type Tab = 'Executive Summary' | 'Financial Projections' | 'Risk Assessment' | 'Recommendations' | 'Industry Benchmarks';
type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

const COLORS = ['#28a745', '#0066cc', '#ffc107', '#dc3545', '#6f42c1'];

const riskStyles = {
    Low: { text: 'text-green-600', bg: 'bg-green-100', value: 25 },
    Medium: { text: 'text-yellow-600', bg: 'bg-yellow-100', value: 50 },
    High: { text: 'text-orange-600', bg: 'bg-orange-100', value: 75 },
    Critical: { text: 'text-red-600', bg: 'bg-red-100', value: 100 },
};
const priorityStyles = {
    High: 'bg-red-50 border-red-200',
    Medium: 'bg-yellow-50 border-yellow-200',
    Low: 'bg-green-50 border-green-200'
}

const Report: React.FC = () => {
    const { language, t } = useLanguage();
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
            pdf.text(`Overall Score: ${analysis.score}/100`, pageWidth / 2, 70, { align: 'center' });

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

        const riskLevel = analysis.riskLevel || 'Medium';
        const risks = [
            {
                risk: 'Market Volatility',
                level: riskLevel,
                score: riskStyles[riskLevel as RiskLevel]?.value || 50,
                description: 'Potential fluctuations in market demand or pricing',
                mitigation: 'Diversify product offerings and maintain flexible pricing strategies'
            },
            {
                risk: 'Financial Risk',
                level: analysis.expectedROI < 0 ? 'High' : analysis.expectedROI > 50 ? 'Low' : 'Medium',
                score: analysis.expectedROI < 0 ? 75 : analysis.expectedROI > 50 ? 25 : 50,
                description: 'Potential for financial losses or lower than expected returns',
                mitigation: 'Maintain adequate cash reserves and establish clear financial monitoring'
            },
            {
                risk: 'Competition Risk',
                level: analysis.successPercent > 70 ? 'Low' : analysis.successPercent > 50 ? 'Medium' : 'High',
                score: analysis.successPercent > 70 ? 25 : analysis.successPercent > 50 ? 50 : 75,
                description: 'Risk of losing market share to competitors',
                mitigation: 'Continuously innovate and monitor competitor activities'
            },
            {
                risk: 'Operational Risk',
                level: 'Low',
                score: 25,
                description: 'Risk of operational inefficiencies or disruptions',
                mitigation: 'Implement robust operational procedures and backup systems'
            }
        ];

        return risks;
    };

    // Generate recommendations based on AI analysis
    const generateRecommendations = () => {
        if (!analysis || !analysis.recommendations) return [];

        return analysis.recommendations.map((rec: string, index: number) => ({
            priority: index === 0 ? 'High' : index === 1 ? 'High' : 'Medium',
            title: rec.split('.')[0] || rec.substring(0, 50),
            impact: Math.round(8 + Math.random() * 2),
            category: index % 3 === 0 ? 'Financial' : index % 3 === 1 ? 'Operational' : 'Strategic',
            description: rec
        }));
    };

    // Generate benchmarks data
    const generateBenchmarks = () => {
        if (!analysis) return [];

        return [
            {
                name: 'Success Rate',
                yourValue: analysis.successPercent || 50,
                industryAverage: 55,
                topPerformers: 85,
                unit: '%'
            },
            {
                name: 'Expected ROI',
                yourValue: Math.abs(analysis.expectedROI || 0),
                industryAverage: 25,
                topPerformers: 60,
                unit: '%'
            },
            {
                name: 'Overall Score',
                yourValue: analysis.score || 50,
                industryAverage: 65,
                topPerformers: 90,
                unit: '/100'
            },
            {
                name: 'Operational Efficiency',
                yourValue: 100 - (riskStyles[analysis.riskLevel as RiskLevel]?.value || 50),
                industryAverage: 60,
                topPerformers: 85,
                unit: '/100'
            }
        ];
    };

    const financialData = React.useMemo(() => generateFinancialProjections(), [analysis]);
    const riskData = React.useMemo(() => generateRiskAssessment(), [analysis]);
    const recommendations = React.useMemo(() => generateRecommendations(), [analysis]);
    const benchmarks = React.useMemo(() => generateBenchmarks(), [analysis]);

    const renderContent = () => {
        // In PDF export mode, render all tabs
        if (pdfExportMode) {
            return (
                <div className="space-y-12">
                    {/* Executive Summary */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.executiveSummary')}</h2>
                        <div className="space-y-6">
                            {analysis.executiveSummary && (
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-blue-600" />
                                        {t('report.executiveSummary')}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{analysis.executiveSummary}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.keyFindings')}</h3>
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
                                        <h4 className="font-bold text-lg">{t('report.successRate')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-green-700 mb-2">{analysis.successPercent}%</p>
                                    <p className="text-sm text-gray-600">{t('report.probabilityGoals')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <TrendingUp className="w-8 h-8 text-blue-600" />
                                        <h4 className="font-bold text-lg">{t('report.roiProjection')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-blue-700 mb-2">{analysis.expectedROI}%</p>
                                    <p className="text-sm text-gray-600">{t('report.expectedRoi')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <DollarSign className="w-8 h-8 text-purple-600" />
                                        <h4 className="font-bold text-lg">{t('report.investment')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-purple-700 mb-2">${analysis.investment.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">{t('report.requiredInvestment')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Projections */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.financialProjections')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.revenueProfitProjections')}</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={financialData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                        <XAxis dataKey="year" stroke="#666" />
                                        <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                        <Tooltip
                                            formatter={(value: any) => `$${value.toLocaleString()}`}
                                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke="#28a745" strokeWidth={3} name={t('report.revenue')} />
                                        <Line type="monotone" dataKey="expenses" stroke="#0066cc" strokeWidth={3} name={t('report.expenses')} />
                                        <Line type="monotone" dataKey="profit" stroke="#ffc107" strokeWidth={3} name={t('report.profit')} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.financialBreakdown')}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.year')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.revenue')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.expenses')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.profit')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.roi')}</th>
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
                                    <h4 className="font-bold mb-4">{t('report.revenueGrowthChart')}</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="revenue" fill="#28a745" name={t('report.revenue')} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold mb-4">{t('report.profitTrend')}</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="profit" fill="#ffc107" name={t('report.profit')} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Risk Assessment */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.riskAssessment')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.riskAnalysisOverview')}</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={riskData}>
                                        <PolarGrid stroke="#ccc" />
                                        <PolarAngleAxis dataKey="risk" stroke="#666" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                                        <Radar name="Risk Level" dataKey="score" stroke="#0066cc" fill="#0066cc" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">{t('report.riskAssessmentMatrix')}</h3>
                                {riskData.map((item, i) => (
                                    <div key={i} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertTriangle className={`w-5 h-5 ${riskStyles[item.level as RiskLevel].text}`} />
                                            <h4 className="font-bold text-lg">{item.risk}</h4>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ms-auto ${riskStyles[item.level as RiskLevel].bg} ${riskStyles[item.level as RiskLevel].text}`}>
                                                {item.level}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <h5 className="font-semibold text-sm mb-2 text-green-800">{t('report.mitigationStrategy')}</h5>
                                            <p className="text-sm text-gray-700">{item.mitigation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.recommendations')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.strategicRecommendations')}</h3>
                                <p className="text-gray-600 mb-6">{t('report.aiInsights')}</p>
                            </div>
                            <div className="space-y-4">
                                {recommendations.map((item, i) => (
                                    <div key={i} className={`border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${item.priority === 'High' ? 'border-red-500 bg-red-50' :
                                        item.priority === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                                            'border-green-500 bg-green-50'
                                        }`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="min-w-0 flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${item.priority === 'High' ? 'bg-red-200 text-red-800' :
                                                        item.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                                                            'bg-green-200 text-green-800'
                                                        }`}>
                                                        {item.priority === 'High' ? t('report.highPriority') :
                                                            item.priority === 'Medium' ? t('report.mediumPriority') :
                                                                t('report.lowPriority')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                    <Tag className="w-4 h-4" />
                                                    {item.category}
                                                    <span className="mx-2">•</span>
                                                    <Target className="w-4 h-4" />
                                                    {item.impact}/10 {t('report.impact')}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                ))}
                            </div >
                        </div >
                    </div >

                    {/* Industry Benchmarks */}
                    < div >
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.industryBenchmarks')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.performanceBenchmarks')}</h3>
                                <p className="text-gray-600 mb-6">{t('report.compareMetrics')}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benchmarks.map((benchmark, i) => (
                                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h4 className="font-bold text-lg">{benchmark.name}</h4>
                                        </div>
                                        <div className="flex items-end gap-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{benchmark.yourValue}</div>
                                                <div className="text-xs text-gray-500">{t('report.yourBusiness')}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-600">{benchmark.industryAverage}</div>
                                                <div className="text-xs text-gray-500">{t('report.industryAvg')}</div>
                                            </div>
                                        </div>
                                        <BenchmarkBar
                                            yourValue={benchmark.yourValue}
                                            industryAverage={benchmark.industryAverage}
                                        />

                                        <p className="text-sm text-gray-600 mt-3">{benchmark.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Regular tab-based rendering
        switch (activeTab) {
            case 'Executive Summary':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.executiveSummary')}</h2>
                        <div className="space-y-6">
                            {analysis.executiveSummary && (
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-blue-600" />
                                        {t('report.executiveSummary')}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{analysis.executiveSummary}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.keyFindings')}</h3>
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
                                        <h4 className="font-bold text-lg">{t('report.successRate')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-green-700 mb-2">{analysis.successPercent}%</p>
                                    <p className="text-sm text-gray-600">{t('report.probabilityGoals')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <TrendingUp className="w-8 h-8 text-blue-600" />
                                        <h4 className="font-bold text-lg">{t('report.roiProjection')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-blue-700 mb-2">{analysis.expectedROI}%</p>
                                    <p className="text-sm text-gray-600">{t('report.expectedRoi')}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <DollarSign className="w-8 h-8 text-purple-600" />
                                        <h4 className="font-bold text-lg">{t('report.investment')}</h4>
                                    </div>
                                    <p className="text-4xl font-bold text-purple-700 mb-2">${analysis.investment.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">{t('report.requiredInvestment')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Financial Projections':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.financialProjections')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.revenueProfitProjections')}</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={financialData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                        <XAxis dataKey="year" stroke="#666" />
                                        <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                        <Tooltip
                                            formatter={(value: any) => `$${value.toLocaleString()}`}
                                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke="#28a745" strokeWidth={3} name={t('report.revenue')} />
                                        <Line type="monotone" dataKey="expenses" stroke="#0066cc" strokeWidth={3} name={t('report.expenses')} />
                                        <Line type="monotone" dataKey="profit" stroke="#ffc107" strokeWidth={3} name={t('report.profit')} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.financialBreakdown')}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.year')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.revenue')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.expenses')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.profit')}</th>
                                                <th className="p-3 font-semibold border-b-2 border-gray-300">{t('report.roi')}</th>
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
                                    <h4 className="font-bold mb-4">{t('report.revenueGrowthChart')}</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="revenue" fill="#28a745" name={t('report.revenue')} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold mb-4">{t('report.profitTrend')}</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={financialData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" stroke="#666" />
                                            <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#666" />
                                            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                            <Bar dataKey="profit" fill="#ffc107" name={t('report.profit')} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Risk Assessment':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{t('report.riskAssessment')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.riskAnalysisOverview')}</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={riskData}>
                                        <PolarGrid stroke="#ccc" />
                                        <PolarAngleAxis dataKey="risk" stroke="#666" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
                                        <Radar name="Risk Level" dataKey="score" stroke="#0066cc" fill="#0066cc" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">{t('report.riskAssessmentMatrix')}</h3>
                                {riskData.map((item, i) => (
                                    <div key={i} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertTriangle className={`w-5 h-5 ${riskStyles[item.level as RiskLevel].text}`} />
                                            <h4 className="font-bold text-lg">{item.risk}</h4>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ms-auto ${riskStyles[item.level as RiskLevel].bg} ${riskStyles[item.level as RiskLevel].text}`}>
                                                {item.level}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <h5 className="font-semibold text-sm mb-2 text-green-800">{t('report.mitigationStrategy')}</h5>
                                            <p className="text-sm text-gray-700">{item.mitigation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Recommendations':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Recommendations</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.strategicRecommendations')}</h3>
                                <p className="text-gray-600 mb-6">{t('report.aiInsights')}</p>
                            </div>
                            <div className="space-y-4">
                                {recommendations.map((item, i) => (
                                    <div key={i} className={`border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${item.priority === 'High' ? 'border-red-500 bg-red-50' :
                                        item.priority === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                                            'border-green-500 bg-green-50'
                                        }`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="min-w-0 flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${item.priority === 'High' ? 'bg-red-200 text-red-800' :
                                                        item.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                                                            'bg-green-200 text-green-800'
                                                        }`}>
                                                        {item.priority === 'High' ? t('report.highPriority') :
                                                            item.priority === 'Medium' ? t('report.mediumPriority') :
                                                                t('report.lowPriority')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                    <Tag className="w-4 h-4" />
                                                    {item.category}
                                                    <span className="mx-2">•</span>
                                                    <Target className="w-4 h-4" />
                                                    {item.impact}/10 {t('report.impact')}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Industry Benchmarks':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Industry Benchmarks</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('report.performanceBenchmarks')}</h3>
                                <p className="text-gray-600 mb-6">{t('report.compareMetrics')}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benchmarks.map((benchmark, i) => (
                                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h4 className="font-bold text-lg">{benchmark.name}</h4>
                                        </div>
                                        <div className="flex items-end gap-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{benchmark.yourValue}</div>
                                                <div className="text-xs text-gray-500">{t('report.yourBusiness')}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-600">{benchmark.industryAverage}</div>
                                                <div className="text-xs text-gray-500">{t('report.industryAvg')}</div>
                                            </div>
                                        </div>
                                        <BenchmarkBar
                                            yourValue={benchmark.yourValue}
                                            industryAverage={benchmark.industryAverage}
                                        />

                                        <p className="text-sm text-gray-600 mt-3">{benchmark.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Add loading and error handling
    if (loading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('report.loadingReport')}</p>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">{t('report.analysisNotFound')}</p>
                    <button onClick={() => navigate('/my-analyses')} className="text-primary-green hover:underline">{t('report.backToAnalyses')}</button>
                </div>
            </div>
        );
    }

    const tabs: { name: Tab, icon: React.ElementType }[] = [
        { name: 'Executive Summary', icon: Award },
        { name: 'Financial Projections', icon: TrendingUp },
        { name: 'Risk Assessment', icon: Shield },
        { name: 'Recommendations', icon: BarChart3 },
        { name: 'Industry Benchmarks', icon: BarChart3 },
    ];

    const StatCard = ({ title, value, icon: Icon, change }: { title: string, value: string, icon: React.ElementType, change?: number }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex-1">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${riskStyles['Low'].bg}`}>
                    <Icon className={`w-5 h-5 ${riskStyles['Low'].text}`} />
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
                <ArrowLeft size={16} /> {t('report.backToAnalyses')}
            </button>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{analysis.title}</h1>
                    <p className="text-gray-500">{t('report.businessAnalysisReport')} • {new Date(analysis.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportToPDF} className="h-10 px-4 border border-gray-300 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-gray-100"><Download size={16} /> {t('report.exportPDF')}</button>
                    <button className="h-10 px-4 border border-gray-300 rounded-md flex items-center gap-2 text-sm font-semibold hover:bg-gray-100"><Share2 size={16} /> {t('report.share')}</button>
                </div>
            </div>
            <div ref={reportRef}>
                <div className="bg-green-50/50 p-6 rounded-lg border border-green-200 mb-8">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-600">{t('report.overallScore')}</p>
                        <p className="text-4xl font-bold text-primary-green">{analysis.score}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Success Probability" value={`${analysis.successPercent}%`} icon={CheckCircle} />
                    <StatCard title="Risk Level" value={analysis.riskLevel} icon={Shield} />
                    <StatCard title="Projected ROI" value={`${analysis.expectedROI}%`} icon={TrendingUp} change={analysis.expectedROI} />
                    <StatCard title="Investment" value={`$${analysis.investment.toLocaleString()}`} icon={Award} />
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
                <button className="h-11 px-6 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">{t('report.startNewAnalysis')}</button>
                <button className="h-11 px-6 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50">{t('report.scheduleConsultation')}</button>
            </div>
        </div >
    );
};

export default Report;