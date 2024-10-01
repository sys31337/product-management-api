import { Schema, model } from 'mongoose';

const requiredString = { type: String, required: true };

const revokedTokensSchema = new Schema({
  token: requiredString,
}, { timestamps: true });

const RevokedTokens = model('RevokedTokens', revokedTokensSchema);
export default RevokedTokens;
