import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { DATABASEURI } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(DATABASEURI as string);

const db: mongoose.Connection = mongoose.connection;

export default db;
