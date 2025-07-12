import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/database';
import { LinkedInProfileData, PersonalizedMessageResponse } from '../types';

const anthropic = new Anthropic({
  apiKey: config.CLAUDE_API_KEY,
});

const createPrompt = (profileData: LinkedInProfileData): string =>
  `
You are a top-tier copywriter helping startups craft highly effective LinkedIn connection requests that convert prospects into meaningful conversations.

🎯 **Prospect details (about the person you're reaching out to)**
• Name: ${profileData.name}
• Job Title: ${profileData.job_title}
• Company: ${profileData.company}
• Location: ${profileData.location}
• Profile Summary: ${profileData.summary}

✍️ **Write ONE personalized LinkedIn connection message (100 to 120 words) that:**
1. **Starts with "Hi [Name]"** - use the prospect's actual name from the data above
2. **Includes "I'm [Your Name] from [Your Company]"** - keep these exact placeholders, do not replace with actual names
3. Maintains a warm, professional, and authentic tone throughout
4. References ONE specific detail about THEIR role, company, or background (the prospect's details above, not yours)
5. Briefly mentions how your startup/solution could provide value to them or their industry
6. Includes a soft, non-pushy call-to-action like "Open to connecting?" or "Worth a brief chat?"
7. Avoids overly salesy language or aggressive pitching
8. Returns **ONLY** the complete message with placeholders intact (no separate subject lines or commentary)

**Message Structure:**
Hi [Name], I'm [Your Name] from [Your Company]. [Personalized comment about their role/company]. [Brief value proposition]. [Gentle CTA]?

Generate the complete personalized message now.
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
