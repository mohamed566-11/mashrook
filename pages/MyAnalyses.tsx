import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Download, Calendar } from 'lucide-react';
import { listAnalyses, getAnalysisById, toMyAnalysis } from '../services/analysisService';
import { MyAnalysis } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const riskColor: Record<string, string> = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
};

const AnalysisCard: React.FC<{ analysis: MyAnalysis; t: (key: string) => string }> = ({ analysis, t }) => {
    const navigate = useNavigate();

    const downloadPDF = async (analysisId: string) => {
        try {
            // Show loading indicator
            const downloadButton = document.getElementById(`download-btn-${analysisId}`);
            if (downloadButton) {
                downloadButton.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mx-auto"></div>';
            }

            // Get the full analysis data
            const token = sessionStorage.getItem('token') || undefined;
            const fullAnalysis = await getAnalysisById(analysisId, token);

            // Create a temporary HTML element to render the PDF content
            const tempElement = document.createElement('div');
            tempElement.style.position = 'absolute';
            tempElement.style.left = '-9999px';
            tempElement.style.width = '210mm'; // A4 width
            tempElement.style.padding = '20px';
            tempElement.style.backgroundColor = 'white';
            tempElement.style.fontFamily = 'Arial, sans-serif';

            // Add content to the temporary element
            tempElement.innerHTML = `
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; font-weight: bold; color: #28a745;">${t('report.title')}</h1>
                    <h2 style="font-size: 20px; margin-top: 10px;">${fullAnalysis.title}</h2>
                    <p style="font-size: 14px; color: #666; margin-top: 5px;">${t('report.generatedOn')}: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>
                            <p style="font-weight: bold; color: #333;">${t('report.successProbability')}</p>
                            <p style="font-size: 24px; font-weight: bold; color: #28a745;">${fullAnalysis.successPercent}%</p>
                        </div>
                        <div>
                            <p style="font-weight: bold; color: #333;">${t('report.riskLevel')}</p>
                            <p style="font-size: 24px; font-weight: bold; color: ${fullAnalysis.riskLevel === 'Low' ? '#28a745' : fullAnalysis.riskLevel === 'Medium' ? '#ffc107' : '#dc3545'}">${fullAnalysis.riskLevel}</p>
                        </div>
                        <div>
                            <p style="font-weight: bold; color: #333;">${t('report.projectedROI')}</p>
                            <p style="font-size: 24px; font-weight: bold; color: ${fullAnalysis.expectedROI >= 0 ? '#28a745' : '#dc3545'}">${fullAnalysis.expectedROI}%</p>
                        </div>
                        <div>
                            <p style="font-weight: bold; color: #333;">${t('report.investment')}</p>
                            <p style="font-size: 24px; font-weight: bold; color: #6f42c1;">$${fullAnalysis.investment.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #28a745; padding-bottom: 5px;">${t('report.executiveSummary')}</h3>
                    <p style="font-size: 14px; line-height: 1.5;">${fullAnalysis.content || t('report.noExecutiveSummary')}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #28a745; padding-bottom: 5px;">${t('report.keyMetrics')}</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background-color: #e9ecef;">
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${t('report.metric')}</th>
                                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${t('report.value')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${t('report.overallScore')}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${fullAnalysis.score}/100</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${t('report.successProbability')}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${fullAnalysis.successPercent}%</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${t('report.riskLevel')}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${fullAnalysis.riskLevel}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${t('report.projectedROI')}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${fullAnalysis.expectedROI}%</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${t('report.investment')}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">$${fullAnalysis.investment.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;

            // Add the element to the document
            document.body.appendChild(tempElement);

            // Generate PDF using html2canvas and jsPDF
            const canvas = await html2canvas(tempElement, {
                scale: 2,
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth - 20; // Add some margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add content image
            pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);

            // Save the PDF
            pdf.save(`${t('report.fileName')}-${fullAnalysis.title || analysisId}.pdf`);

            // Clean up
            document.body.removeChild(tempElement);

            // Restore button text
            if (downloadButton) {
                downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert(t('report.pdfGenerationFailed'));

            // Restore button text
            const downloadButton = document.getElementById(`download-btn-${analysisId}`);
            if (downloadButton) {
                downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{analysis.name}</h3>
                    <p className="text-sm text-gray-500">{analysis.details}</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-primary-green">{analysis.score}</p>
                    <p className="text-sm text-gray-500">{t('analyses.score')}</p>
                </div>
            </div>
            <div className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start my-4 ${riskColor[analysis.riskLevel]}`}>
                {analysis.riskLevel} {t('analyses.riskLevel')} &bull; {analysis.successPercent}% {t('analyses.success')}
            </div>
            <div className="space-y-2 text-sm text-gray-600 border-t border-b py-4 my-4 flex-grow">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {t('common.createdAt')}</span>
                    <span>{analysis.date}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>{t('report.investment')}:</span>
                    <span className="font-semibold">${analysis.investment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>{t('report.expectedROI')}:</span>
                    <span className={`font-semibold ${analysis.expectedROI < 0 ? 'text-red-500' : 'text-green-600'}`}>{analysis.expectedROI}%</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/report/${analysis.id}`)} className="flex-1 h-10 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">{t('common.view')}</button>
                <button
                    id={`download-btn-${analysis.id}`}
                    onClick={() => downloadPDF(analysis.id)}
                    className="h-10 w-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    aria-label={t('report.downloadPDF')}
                >
                    <Download size={18} />
                </button>
            </div>
        </div>
    );
};

const MyAnalyses: React.FC = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [analyses, setAnalyses] = useState<MyAnalysis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const token = sessionStorage.getItem('token') || undefined;

                // Determine if user should see all analyses
                // Admin and developer users can see all analyses
                // Regular users only see their own analyses
                const isPrivilegedUser = user?.role === 'admin' || user?.role === 'developer';
                let userId: number | undefined;

                // Only parse user ID for non-privileged users
                if (!isPrivilegedUser && user?.id) {
                    userId = parseInt(user.id, 10);
                    // Check if parsing was successful
                    if (isNaN(userId)) {
                        console.error('Invalid user ID:', user.id);
                        userId = undefined;
                    }
                }

                const analysisList = await listAnalyses(
                    token,
                    isPrivilegedUser ? undefined : userId, // Pass userId only if not admin/developer
                    user?.role
                );

                const myAnalyses = analysisList.map(toMyAnalysis);
                setAnalyses(myAnalyses);
            } catch (error) {
                console.error('Failed to fetch analyses:', error);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if user data is available
        if (user !== undefined) {
            fetchAnalyses();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{t('analyses.title')}</h1>
                </div>
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-green"></div>
                    <p className="mt-4 text-gray-600">{t('common.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{t('analyses.title')}</h1>
                <button
                    onClick={() => navigate('/templates')}
                    className="bg-primary-green text-white px-4 py-2 rounded-md hover:bg-primary-green-hover font-medium flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    {t('analyses.createNew')}
                </button>
            </div>

            {analyses.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{t('analyses.noAnalyses')}</h3>
                    <p className="text-gray-500 mb-6">{t('analyses.description')}</p>
                    <button
                        onClick={() => navigate('/templates')}
                        className="bg-primary-green text-white px-4 py-2 rounded-md hover:bg-primary-green-hover font-medium"
                    >
                        {t('analyses.createNew')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analyses.map(analysis => (
                        <AnalysisCard key={analysis.id} analysis={analysis} t={t} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAnalyses;