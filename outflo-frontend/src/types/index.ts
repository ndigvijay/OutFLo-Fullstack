export interface Campaign {
  _id?: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Deleted';
  leads: string[];
  accountIds: string[];
  createdAt?: string;
  updatedAt?: string;
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

export interface CreateCampaignRequest {
  name: string;
  description: string;
  status?: 'Active' | 'Inactive';
  leads?: string[];
  accountIds?: string[];
} 