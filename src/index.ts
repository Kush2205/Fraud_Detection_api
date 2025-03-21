import express from 'express';
import mongoose from 'mongoose';
import {connectDB} from './db/index';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.get('/fraud-apps', async (req, res) => {
    await connectDB();
    const fraudApps = await mongoose.connection.collection('FraudulentApp').find().toArray();
    res.json(fraudApps);
})

app.get('/fraud-url' , async (req, res) => {
    await connectDB();
    const fraudUrl = await mongoose.connection.collection('FraudulentUrl').find().toArray();
    res.json(fraudUrl);
})

app.get('/fraud-trends' , async (req, res) => {
    await connectDB();
    const fraudTrends = await mongoose.connection.collection('FraudTrend').find().toArray();
    res.json(fraudTrends);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

