// Environment configuration utilities

export const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:6969/api/v1',
  
  // Environment detection
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Debug helper
  logConfig: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 OutFlo Config:', {
        API_URL: config.API_URL,
        ENVIRONMENT: process.env.NODE_ENV,
      });
    }
  }
};

export default config; 