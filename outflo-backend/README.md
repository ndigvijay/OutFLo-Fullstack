# OutFlo Campaign Management System

A TypeScript backend API for managing LinkedIn outreach campaigns with AI-powered message generation.

## Features

- Campaign CRUD operations 
- LinkedIn profile-based personalized message generation using Claude AI
- MongoDB integration with optimized schemas
- Comprehensive input validation and error handling
- RESTful API design with consistent response format

## API Endpoints

### Campaign Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/campaigns` | List all active campaigns |
| GET | `/api/v1/campaigns/:id` | Get campaign by ID |
| POST | `/api/v1/campaigns` | Create new campaign |
| PUT | `/api/v1/campaigns/:id` | Update campaign |
| DELETE | `/api/v1/campaigns/:id` | delete campaign |

### Message Generation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/personalized-message` | Generate LinkedIn outreach message |

## Setup

### Prerequisites
- Node.js 16+
- MongoDB 
- Claude API key

### Installation
```bash
npm install
```

### Configuration
Create `.env` file:
```env
MONGO_URI=mongodb://127.0.0.1:27017/outflo
CLAUDE_API_KEY=your_claude_api_key
PORT=6969
NODE_ENV=development
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## Data Models

### Campaign
```typescript
{
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Deleted';
  leads: string[];        // LinkedIn URLs
  accountIds: ObjectId[]; // Account references
}
```

### Account
```typescript
{
  firstName: string;
  lastName: string;
  linkedinUrl: string;
  currentJobTitle: string;
  currentCompany: string;
  location?: string;
  summary?: string;
}
```

## Usage Examples

### Create Campaign
```bash
curl -X POST http://localhost:6969/api/v1/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Outreach",
    "description": "Software engineer outreach campaign",
    "leads": ["https://linkedin.com/in/example"]
  }'
```

### Generate Message
```bash
curl -X POST http://localhost:6969/api/v1/personalized-message \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "job_title": "Software Engineer",
    "company": "TechCorp",
    "location": "San Francisco, CA",
    "summary": "5+ years experience in AI/ML"
  }'
```

## Response Format
```typescript
{
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}
```

## Architecture
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Anthropic Claude API
- **Validation**: Custom middleware with comprehensive error handling 