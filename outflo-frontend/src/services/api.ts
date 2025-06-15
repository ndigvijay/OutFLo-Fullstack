import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Campaign,
  CreateCampaignRequest,
  PersonalizedMessageRequest,
  PersonalizedMessageResponse,
  ApiResponse
} from '../types';
import config from '../utils/config';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Log configuration in development
    config.logConfig();
  }

  // Campaign API methods
  async getAllCampaigns(): Promise<Campaign[]> {
    const response: AxiosResponse<ApiResponse<Campaign[]>> = await this.api.get('/campaigns');
    return response.data.data || [];
  }

  async getCampaignById(id: string): Promise<Campaign> {
    const response: AxiosResponse<ApiResponse<Campaign>> = await this.api.get(`/campaigns/${id}`);
    return response.data.data!;
  }

  async createCampaign(campaign: CreateCampaignRequest): Promise<Campaign> {
    const response: AxiosResponse<ApiResponse<Campaign>> = await this.api.post('/campaigns', campaign);
    return response.data.data!;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    const response: AxiosResponse<ApiResponse<Campaign>> = await this.api.put(`/campaigns/${id}`, updates);
    return response.data.data!;
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.api.delete(`/campaigns/${id}`);
  }

  // Message generation API method
  async generatePersonalizedMessage(profileData: PersonalizedMessageRequest): Promise<string> {
    const response: AxiosResponse<ApiResponse<PersonalizedMessageResponse>> = await this.api.post(
      '/personalized-message',
      profileData
    );
    return response.data.data?.message || '';
  }
}

export const apiService = new ApiService(); 