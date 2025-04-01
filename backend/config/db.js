import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://aaryanmandal1:Mandal6265@cluster0.rv4kj.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
