import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected: ' + conn.connection.host);
  } catch (e) {
    console.log(e);
    return process.exit(1);
  }
};

export default connectDB;
