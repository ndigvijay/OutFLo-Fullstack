import { Request, Response } from 'express';
import { generatePersonalizedMessage as generateMessage } from '../services/claudeService';
import {
  PersonalizedMessageRequest,
  PersonalizedMessageResponse,
  ApiResponse,
} from '../types';

export const generatePersonalizedMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      job_title,
      company,
      location,
      summary,
    }: PersonalizedMessageRequest = req.body;

    if (!name || !job_title || !company || !location || !summary) {
      res.status(400).json({
        success: false,
        error:
          'All fields are required: name, job_title, company, location, summary',
      } as ApiResponse);
      return;
    }

    if (
      name.length > 100 ||
      job_title.length > 100 ||
      company.length > 100 ||
      location.length > 100
    ) {
      res.status(400).json({
        success: false,
        error: 'Field values are too long (max 100 characters each)',
      } as ApiResponse);
      return;
    }

    if (summary.length > 500) {
      res.status(400).json({
        success: false,
        error: 'Summary is too long (max 500 characters)',
      } as ApiResponse);
      return;
    }

    const profileData = {
      name: name.trim(),
      job_title: job_title.trim(),
      company: company.trim(),
      location: location.trim(),
      summary: summary.trim(),
    };

    const messageResponse = await generateMessage(profileData);

    res.status(200).json({
      success: true,
      data: messageResponse,
      message: 'Personalized message generated successfully',
    } as ApiResponse<PersonalizedMessageResponse>);
  } catch (error) {
    console.error('Error generating personalized message:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        res.status(401).json({
          success: false,
          error: 'Invalid Claude API key configuration',
        } as ApiResponse);
        return;
      }

      if (error.message.includes('rate limit')) {
        res.status(429).json({
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
        } as ApiResponse);
        return;
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate personalized message',
    } as ApiResponse);
  }
};
