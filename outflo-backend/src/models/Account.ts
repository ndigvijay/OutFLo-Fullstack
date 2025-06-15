import mongoose, { Schema } from 'mongoose';
import { IAccount } from '../types';

const accountSchema = new Schema<IAccount>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    linkedinUrl: {
      type: String,
      required: [true, 'LinkedIn URL is required'],
      validate: {
        validator: function (url: string) {
          return /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
        },
        message: 'Must be a valid LinkedIn URL',
      },
    },
    currentJobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    currentCompany: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
accountSchema.index({ linkedinUrl: 1 }, { unique: true });
accountSchema.index({ firstName: 1, lastName: 1 });
accountSchema.index({ currentJobTitle: 1 });
accountSchema.index({ currentCompany: 1 });

export const Account = mongoose.model<IAccount>('Account', accountSchema);
