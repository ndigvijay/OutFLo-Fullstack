import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/database';
import { LinkedInProfileData, PersonalizedMessageResponse } from '../types';

const anthropic = new Anthropic({
  apiKey: config.CLAUDE_API_KEY,
});

const createPrompt = (profileData: LinkedInProfileData): string =>
  `
You are a top-tier B2B copywriter helping **OutFlo**—an early-stage, founder-mentored AI outreach startup in Bangalore—craft LinkedIn connection requests that convert.

🎯 **Prospect details**
• Name: ${profileData.name}
• Job Title: ${profileData.job_title}
• Company: ${profileData.company}
• Location: ${profileData.location}
• Profile Summary: ${profileData.summary}

✍️ **Write ONE message (50 to 70 words) that:**
1. Speaks in first-person singular (“I”), warm yet professional.
2. Maintain a professional and courteous tone throughout.  
3. References a single authentic detail about their role or company (use data above, no inventions).  
4. Introduces OutFlo in one sentence as a *next-gen AI tool that helps sales teams book more meetings*—keep it value-oriented, not salesy.  
5. Optionally nods to our early-stage, high-growth spirit (e.g., team mentored by founders who have led business teams at SaaS companies).  
6. Ends with a gentle CTA such as “Open to connecting?” or “Worth a quick chat?”  
7. Returns **only** the message body (no subject lines, greetings, or commentary).

Generate the final message now.
`.trim();

const extractMessageContent = (message: any): string => {
  if (message?.content?.[0]?.text) {
    return message.content[0].text.trim();
  }

  return "Hi there! I came across your profile and thought OutFlo could help you streamline outreach and book more meetings. Let's connect!";
};

export const generatePersonalizedMessage = async (
  profileData: LinkedInProfileData
): Promise<PersonalizedMessageResponse> => {
  try {
    const prompt = createPrompt(profileData);

    const message = await anthropic.messages.create({
      model: config.CLAUDE_MODEL,
      max_tokens: 300,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const generatedMessage = extractMessageContent(message);

    return {
      message: generatedMessage,
    };
  } catch (error) {
    console.error('Error generating personalized message:', error);
    throw new Error('Failed to generate personalized message');
  }
};
