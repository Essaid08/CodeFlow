import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDataBase = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        console.log('Missing MONGODB_URL');
        return 
    }

    if (isConnected) {
        console.log('MongoDB is already connected!');
        return 
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL!, {
            dbName: 'codeFlow',
        });
        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB connection failed', error);
        isConnected = false;
        throw error;
    }
};
