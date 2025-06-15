import { Document } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Deleted';
  leads: string[];
  accountIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccount extends Document {
  firstName: string;
  lastName: string;
  linkedinUrl: string;
  currentJobTitle: string;
  currentCompany: string;
  location?: string;
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LinkedInProfileData {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface PersonalizedMessageRequest {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface PersonalizedMessageResponse {
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
