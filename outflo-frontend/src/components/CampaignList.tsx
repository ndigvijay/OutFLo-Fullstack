import React from 'react';
import { Campaign } from '../types';
import './CampaignList.css';

interface CampaignListProps {
  campaigns: Campaign[];
  onToggleStatus: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      default:
        return 'status-deleted';
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="campaign-list-empty">
        <p>No campaigns found. Create your first campaign to get started!</p>
      </div>
    );
  }

  return (
    <div className="campaign-list">
      {campaigns.map((campaign) => (
        <div key={campaign._id} className="campaign-card">
          <div className="campaign-header">
            <h3 className="campaign-name">{campaign.name}</h3>
            <div className="campaign-actions">
              <button
                className={`status-toggle ${getStatusColor(campaign.status)}`}
                onClick={() => onToggleStatus(campaign)}
                disabled={campaign.status === 'Deleted'}
              >
                {campaign.status}
              </button>
              <button
                className="btn-edit"
                onClick={() => onEdit(campaign)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(campaign)}
              >
                Delete
              </button>
            </div>
          </div>
          
          <p className="campaign-description">{campaign.description}</p>
          
          <div className="campaign-details">
            <div className="detail-item">
              <span className="detail-label">Leads:</span>
              <span className="detail-value">{campaign.leads.length}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created:</span>
              <span className="detail-value">{formatDate(campaign.createdAt)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Updated:</span>
              <span className="detail-value">{formatDate(campaign.updatedAt)}</span>
            </div>
          </div>

          {campaign.leads.length > 0 && (
            <div className="campaign-leads">
              <h4>Leads:</h4>
              <ul>
                {campaign.leads.slice(0, 3).map((lead, index) => (
                  <li key={index}>
                    <a href={lead} target="_blank" rel="noopener noreferrer">
                      {lead}
                    </a>
                  </li>
                ))}
                {campaign.leads.length > 3 && (
                  <li className="leads-more">
                    +{campaign.leads.length - 3} more...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CampaignList; 