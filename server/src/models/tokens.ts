import { Schema, model } from 'mongoose';
import { requiredString } from './common';

const revokedTokensSchema = new Schema({
  token: requiredString,
}, { timestamps: true });

const RevokedTokens = model('RevokedTokens', revokedTokensSchema);
export default RevokedTokens;
