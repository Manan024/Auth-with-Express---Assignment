import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb://localhost:27017/InstagramUsers"
    );

    if (connection) {
      console.log(`Database Connected Successfully !! : ${connection.host}`);
    }
  } catch (error) {
    console.log("Database Connected Failed !!");
    throw error;
  }
};

export default connectToDb;
