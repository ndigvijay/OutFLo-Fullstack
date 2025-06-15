import express, { Router, Request, Response } from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campaignController';
import { generatePersonalizedMessage } from '../controllers/messageController';

const router: Router = express.Router();

// Welcome route
router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to the OutFlo Campaign Management REST API',
    version: '1.0.0',
    endpoints: {
      campaigns: {
        'GET /campaigns': 'Fetch all campaigns (excluding deleted)',
        'GET /campaigns/:id': 'Fetch a single campaign by ID',
        'POST /campaigns': 'Create a new campaign',
        'PUT /campaigns/:id': 'Update campaign details (including status)',
        'DELETE /campaigns/:id': 'Delete campaign (set status to DELETED)',
      },
      messages: {
        'POST /personalized-message':
          'Generate personalized LinkedIn outreach message',
      },
    },
  });
});

// Campaign routes
router.post('/campaigns', createCampaign);
router.get('/campaigns', getAllCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.put('/campaigns/:id', updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);

// LinkedIn message generation route
router.post('/personalized-message', generatePersonalizedMessage);

export default router;
