import mongoose from 'mongoose';

async function connectDb() {
    await mongoose.connect(process.env?.MONGOURI);
    console.log("db connected");
}

export default connectDb;