import React, { useState, useEffect } from 'react';
import { Campaign, CreateCampaignRequest } from '../types';
import './CampaignForm.css';

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (campaign: CreateCampaignRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  campaign,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateCampaignRequest>({
    name: '',
    description: '',
    status: 'Active',
    leads: [],
    accountIds: [],
  });

  const [leadsText, setLeadsText] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description,
        status: campaign.status === 'Deleted' ? 'Inactive' : campaign.status,
        leads: campaign.leads,
        accountIds: campaign.accountIds,
      });
      setLeadsText(campaign.leads.join('\n'));
    }
  }, [campaign]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Campaign description is required';
    }

    if (leadsText.trim()) {
      const leads = leadsText.split('\n').filter(lead => lead.trim());
      const invalidLeads = leads.filter(lead => {
        try {
          new URL(lead.trim());
          return !lead.includes('linkedin.com');
        } catch {
          return true;
        }
      });

      if (invalidLeads.length > 0) {
        newErrors.leads = 'All leads must be valid LinkedIn URLs';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const leads = leadsText
      .split('\n')
      .map(lead => lead.trim())
      .filter(lead => lead);

    onSubmit({
      ...formData,
      leads,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLeadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeadsText(e.target.value);
    
    // Clear error when user starts typing
    if (errors.leads) {
      setErrors(prev => ({ ...prev, leads: '' }));
    }
  };

  return (
    <div className="campaign-form-overlay">
      <div className="campaign-form-modal">
        <div className="campaign-form-header">
          <h2>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="name">Campaign Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter campaign name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Enter campaign description"
              rows={3}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leads">LinkedIn Leads (one per line)</label>
            <textarea
              id="leads"
              value={leadsText}
              onChange={handleLeadsChange}
              className={errors.leads ? 'error' : ''}
              placeholder="https://linkedin.com/in/example1&#10;https://linkedin.com/in/example2&#10;..."
              rows={6}
            />
            {errors.leads && <span className="error-message">{errors.leads}</span>}
            <small className="form-help">
              Enter LinkedIn profile URLs, one per line. Each URL should be a valid LinkedIn profile.
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (campaign ? 'Update Campaign' : 'Create Campaign')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm; 