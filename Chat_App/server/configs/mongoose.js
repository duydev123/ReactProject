import mongoose from 'mongoose';



export const MongoDBConnect = async ({mongo_url}) => {
    try {
        await mongoose.connect(mongo_url);
    } catch (error) {
        console.log("MongoDb error: ", error.message);
    }
}