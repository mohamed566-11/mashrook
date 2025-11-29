import { apiRequest } from './apiClient';
import { AnalysisFormData, MyAnalysis } from '../types';

export interface AnalysisListItem {
  id: number;
  title: string;
  createdAt: string;
  ownerEmail?: string;
  templateName?: string;
  score: number;
  riskLevel: string;
  successPercent: number;
  investment: number;
  expectedROI: number;
}

export interface AnalysisResponse {
  id: number;
  title: string;
  content?: string;
  score: number;
  riskLevel: string;
  successPercent: number;
  investment: number;
  expectedROI: number;
  createdAt: string;
  ownerName?: string;
  templateName?: string;
}

export async function listAnalyses(token?: string, userId?: number, userRole?: string): Promise<AnalysisListItem[]> {
  const params = new URLSearchParams();
  if (userId) params.append('userId', userId.toString());
  if (userRole) params.append('userRole', userRole);

  const queryString = params.toString();
  const url = queryString ? `/api/analyses?${queryString}` : '/api/analyses';

  return apiRequest<AnalysisListItem[]>('GET', url, undefined, token);
}

export async function getAnalysisById(id: string | number, token?: string): Promise<AnalysisResponse> {
  return apiRequest<AnalysisResponse>('GET', `/api/analyses/${id}`, undefined, token);
}

export async function createAnalysis(
  formData: AnalysisFormData,
  ownerId: number,
  token?: string
): Promise<{ id: number }> {
  const title =
    (formData.step1?.businessName as string) ||
    (formData.step1?.name as string) ||
    "Business Analysis Report";

  const payload = {
    title,
    content: JSON.stringify(formData),
    ownerId,
    templateId: null,
  };

  return apiRequest<{ id: number }>('POST', '/api/analyses', payload, token);
}

export async function deleteAnalysis(id: number, token?: string): Promise<void> {
  await apiRequest<void>('DELETE', `/api/analyses/${id}`, undefined, token);
}

// Helper to map backend items to UI cards
export function toMyAnalysis(item: AnalysisListItem): MyAnalysis {
  return {
    id: String(item.id),
    name: item.title,
    details: `${item.templateName || 'General'} • ${item.ownerEmail || 'N/A'}`,
    riskLevel: (item.riskLevel as 'Low' | 'Medium' | 'High') || 'Medium',
    successPercent: item.successPercent || 0,
    date: new Date(item.createdAt).toLocaleDateString(),
    investment: item.investment || 0,
    expectedROI: item.expectedROI || 0,
    score: item.score || 0,
  };
}
