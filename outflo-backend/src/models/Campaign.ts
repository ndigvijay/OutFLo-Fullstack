import mongoose, { Schema } from 'mongoose';
import { ICampaign } from '../types';

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: [true, 'Campaign name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Campaign description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive', 'Deleted'],
        message: 'Status must be Active, Inactive, or Deleted',
      },
      default: 'Active',
    },
    leads: [
      {
        type: String,
        validate: {
          validator: function (url: string) {
            return /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
          },
          message: 'Must be a valid LinkedIn URL',
        },
      },
    ],
    accountIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
campaignSchema.index({ status: 1 });
campaignSchema.index({ name: 1 });

// Don't return deleted campaigns in normal queries
campaignSchema.pre(/^find/, function (this: any) {
  if (!this.getOptions().includeDeleted) {
    this.find({ status: { $ne: 'Deleted' } });
  }
});

export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);
