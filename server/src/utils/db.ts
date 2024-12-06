import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        return await mongoose.connect(process.env.DATA_BASE_URL)
    } catch (err) {
        console.error("DB connect error:", err);
    }

}