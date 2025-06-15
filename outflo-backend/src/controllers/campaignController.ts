import { Request, Response } from 'express';
import { Campaign } from '../models/Campaign';
import { Account } from '../models/Account';
import { ICampaign, ApiResponse } from '../types';
import mongoose from 'mongoose';

export const createCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, status, leads, accountIds } = req.body;

    if (!name || !description) {
      res.status(400).json({
        success: false,
        error: 'Name and description are required',
      } as ApiResponse);
      return;
    }

    if (accountIds && accountIds.length > 0) {
      const invalidIds = accountIds.filter(
        (id: string) => !mongoose.Types.ObjectId.isValid(id)
      );
      if (invalidIds.length > 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid account IDs provided',
        } as ApiResponse);
        return;
      }
    }

    const campaign = new Campaign({
      name,
      description,
      status: status || 'Active',
      leads: leads || [],
      accountIds: accountIds || [],
    });

    const savedCampaign = await campaign.save();

    res.status(201).json({
      success: true,
      data: savedCampaign,
      message: 'Campaign created successfully',
    } as ApiResponse<ICampaign>);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create campaign',
    } as ApiResponse);
  }
};

export const getCampaignById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: 'Invalid campaign ID',
      } as ApiResponse);
      return;
    }

    const campaign = await Campaign.findById(id).populate('accountIds');

    if (!campaign) {
      res.status(404).json({
        success: false,
        error: 'Campaign not found',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: campaign,
    } as ApiResponse<ICampaign>);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve campaign',
    } as ApiResponse);
  }
};

export const getAllCampaigns = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const campaigns = await Campaign.find().populate('accountIds');

    res.status(200).json({
      success: true,
      data: campaigns,
      message: `Found ${campaigns.length} campaigns`,
    } as ApiResponse<ICampaign[]>);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve campaigns',
    } as ApiResponse);
  }
};

export const updateCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: 'Invalid campaign ID',
      } as ApiResponse);
      return;
    }

    if (updateData.accountIds && updateData.accountIds.length > 0) {
      const invalidIds = updateData.accountIds.filter(
        (accountId: string) => !mongoose.Types.ObjectId.isValid(accountId)
      );
      if (invalidIds.length > 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid account IDs provided',
        } as ApiResponse);
        return;
      }
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('accountIds');

    if (!updatedCampaign) {
      res.status(404).json({
        success: false,
        error: 'Campaign not found',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedCampaign,
      message: 'Campaign updated successfully',
    } as ApiResponse<ICampaign>);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update campaign',
    } as ApiResponse);
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: 'Invalid campaign ID',
      } as ApiResponse);
      return;
    }

    const deletedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { status: 'Deleted' },
      { new: true }
    );

    if (!deletedCampaign) {
      res.status(404).json({
        success: false,
        error: 'Campaign not found',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: deletedCampaign,
      message: 'Campaign deleted successfully',
    } as ApiResponse<ICampaign>);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete campaign',
    } as ApiResponse);
  }
};
