import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {

    mongoose.connect("mongodb+srv://gianlucalarraya:zoAXp6OOSedB6yK1@clustercoder.uito7.mongodb.net/")
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
  }
}