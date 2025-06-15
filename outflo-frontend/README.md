# OutFlo Frontend

A modern React + TypeScript frontend for the OutFlo Campaign Management System.

## 🚀 Features

### Campaign Management UI
- **Dashboard**: View all campaigns with statistics and status overview
- **Campaign CRUD**: Create, read, update, and delete campaigns
- **Status Toggle**: Switch between Active/Inactive status with visual indicators
- **Lead Management**: Add and manage LinkedIn profile URLs for outreach
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### LinkedIn Message Generator UI
- **Profile Form**: Input LinkedIn profile data fields (name, job title, company, location, summary)
- **AI-Generated Messages**: Generate personalized outreach messages using Claude AI
- **Sample Data**: Pre-filled sample data for quick testing
- **Copy to Clipboard**: Easy message copying for use in LinkedIn
- **Real-time Validation**: Form validation with helpful error messages

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety and better development experience
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with Grid and Flexbox
- **No external state management** - Using React's built-in state management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CampaignList.tsx    # Campaign cards display
│   ├── CampaignForm.tsx    # Campaign create/edit form
│   └── MessageGenerator.tsx # LinkedIn message generator
├── layouts/             # Layout components
│   └── MainLayout.tsx      # Main app layout with navigation
├── pages/              # Page components
│   ├── Dashboard.tsx       # Campaign management dashboard
│   └── MessageGeneratorPage.tsx # Message generator page
├── services/           # API service layer
│   └── api.ts             # Backend API communication
├── types/              # TypeScript type definitions
│   └── index.ts           # Shared types
└── utils/              # Utility functions
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 16+ 
- npm or yarn
- OutFlo backend server running on `http://localhost:6969`

### Installation

1. **Clone or navigate to the frontend directory**
   ```bash
   cd outflo-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Visit `http://localhost:3000` to see the application

### Backend Connection

The frontend is configured to use environment variables for the backend URL:
- **Production**: Uses the deployed backend URL from `.env` file
- **Development**: Falls back to `http://localhost:6969` if no environment variable is set

The app is currently configured to use the deployed backend at `https://outflo-backend-tsms.onrender.com/api/v1`.

## 📱 Usage Guide

### Campaign Management

1. **Dashboard Overview**
   - View campaign statistics (Total, Active, Leads count)
   - See all campaigns in a card-based layout
   - Quick access to campaign actions

2. **Creating a Campaign**
   - Click "Create Campaign" button
   - Fill in campaign name and description
   - Add LinkedIn profile URLs (one per line)
   - Choose Active/Inactive status
   - Click "Create Campaign" to save

3. **Editing a Campaign**
   - Click "Edit" button on any campaign card
   - Modify the campaign details
   - Click "Update Campaign" to save changes

4. **Managing Campaign Status**
   - Click the status badge (Active/Inactive) to toggle
   - Visual indicators show the current status
   - Deleted campaigns cannot have their status changed

5. **Deleting a Campaign**
   - Click "Delete" button on campaign card
   - Confirm the deletion in the dialog
   - Campaign will be permanently removed

### Message Generation

1. **Navigate to Message Generator**
   - Click "Message Generator" in the top navigation

2. **Fill Profile Information**
   - Enter LinkedIn profile details manually, or
   - Click "Load Sample Data" for quick testing

3. **Generate Message**
   - Click "Generate Message" button
   - Wait for AI to create personalized message
   - Generated message appears in the right panel

4. **Copy and Use**
   - Click "Copy to Clipboard" to copy the message
   - Paste directly into LinkedIn for outreach

## 🎨 Design System

The application uses a clean, modern design with:
- **Color Palette**: Blue primary (#3b82f6), with semantic colors for status
- **Typography**: System fonts for readability and performance
- **Spacing**: Consistent 8px grid system
- **Components**: Card-based layouts with subtle shadows and hover effects
- **Responsive**: Mobile-first design that works on all screen sizes

## 🔧 Configuration

### API Endpoint

The backend URL is configured via environment variables. To change it:

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```env
   REACT_APP_API_URL=https://your-backend-url.com/api/v1
   ```

3. **Or for local development:**
   ```env
   REACT_APP_API_URL=http://localhost:6969/api/v1
   ```

The API service automatically uses the environment variable with a fallback to localhost.

### Styling

The application uses CSS modules with BEM-inspired naming. Each component has its own CSS file for maintainability.

## 🚀 Building for Production

```bash
# Create production build
npm run build

# The build files will be in the 'build' directory
# Serve them using any static file server
```

## 🧪 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to backend**
   - Ensure backend is running on `http://localhost:6969`
   - Check for CORS issues
   - Verify API endpoints are correct

2. **TypeScript errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all imports and types are correct

3. **Styling issues**
   - Clear browser cache
   - Check for CSS conflicts
   - Ensure all CSS files are properly imported

### Error Handling

The application includes comprehensive error handling:
- Network errors show user-friendly messages
- Form validation prevents invalid submissions
- Loading states keep users informed during API calls

