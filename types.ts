import React from 'react';

export interface User {
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'developer';
  avatar?: string;
  token?: string;
  status?: string;
  analyses?: number;
  lastLogin?: string;
}

export interface AnalysisStepData {
  [key: string]: any;
}

export interface AnalysisFormData {
  step1: AnalysisStepData;
  step2: AnalysisStepData;
  step3: AnalysisStepData;
  step4: AnalysisStepData;
  step5: AnalysisStepData;
}

export interface RecentAnalysis {
  id: string;
  name: string;
  type: string;
  date: string;
  score: number;
  status: string;
}

export interface MyAnalysis {
  id: string;
  name: string;
  details: string;
  riskLevel: string;
  successPercent: number;
  date: string;
  investment: number;
  expectedROI: number;
  score: number;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number; // in minutes
  isPopular: boolean;
  icon: React.ComponentType<{ className?: string }>;
}