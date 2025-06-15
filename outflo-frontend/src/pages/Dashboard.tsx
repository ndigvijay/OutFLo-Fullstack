import React, { useState, useEffect } from 'react';
import { Campaign, CreateCampaignRequest } from '../types';
import { apiService } from '../services/api';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load campaigns on component mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await apiService.getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Error loading campaigns:', err);
      setError('Failed to load campaigns. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    setEditingCampaign(undefined);
    setShowForm(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: CreateCampaignRequest) => {
    try {
      setIsSubmitting(true);
      setError('');

      if (editingCampaign) {
        // Update existing campaign
        await apiService.updateCampaign(editingCampaign._id!, formData);
        setCampaigns(prev => 
          prev.map(c => 
            c._id === editingCampaign._id 
              ? { ...c, ...formData } 
              : c
          )
        );
      } else {
        // Create new campaign
        const newCampaign = await apiService.createCampaign(formData);
        setCampaigns(prev => [newCampaign, ...prev]);
      }

      setShowForm(false);
      setEditingCampaign(undefined);
    } catch (err) {
      console.error('Error saving campaign:', err);
      setError('Failed to save campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCampaign(undefined);
    setError('');
  };

  const handleToggleStatus = async (campaign: Campaign) => {
    try {
      const newStatus = campaign.status === 'Active' ? 'Inactive' : 'Active';
      await apiService.updateCampaign(campaign._id!, { status: newStatus });
      
      setCampaigns(prev => 
        prev.map(c => 
          c._id === campaign._id 
            ? { ...c, status: newStatus } 
            : c
        )
      );
    } catch (err) {
      console.error('Error toggling campaign status:', err);
      setError('Failed to update campaign status. Please try again.');
    }
  };

  const handleDeleteCampaign = async (campaign: Campaign) => {
    if (!window.confirm(`Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await apiService.deleteCampaign(campaign._id!);
      setCampaigns(prev => prev.filter(c => c._id !== campaign._id));
    } catch (err) {
      console.error('Error deleting campaign:', err);
      setError('Failed to delete campaign. Please try again.');
    }
  };

  const getActiveCampaignsCount = () => {
    return campaigns.filter(c => c.status === 'Active').length;
  };

  const getTotalLeadsCount = () => {
    return campaigns.reduce((total, c) => total + c.leads.length, 0);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Campaign Dashboard</h1>
          <p>Manage your LinkedIn outreach campaigns</p>
        </div>
        <button 
          className="btn-create"
          onClick={handleCreateCampaign}
        >
          + Create Campaign
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      {/* Campaign Stats */}
      <div className="campaign-stats">
        <div className="stat-card">
          <h3>Total Campaigns</h3>
          <p className="stat-number">{campaigns.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Campaigns</h3>
          <p className="stat-number">{getActiveCampaignsCount()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Leads</h3>
          <p className="stat-number">{getTotalLeadsCount()}</p>
        </div>
      </div>

      {/* Campaign List */}
      <div className="campaigns-section">
        <div className="campaigns-header">
          <h2>Your Campaigns</h2>
          <button 
            className="btn-refresh"
            onClick={loadCampaigns}
            disabled={isLoading}
          >
            🔄 Refresh
          </button>
        </div>
        
        <CampaignList
          campaigns={campaigns}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteCampaign}
          onEdit={handleEditCampaign}
        />
      </div>

      {/* Campaign Form Modal */}
      {showForm && (
        <CampaignForm
          campaign={editingCampaign}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default Dashboard; 