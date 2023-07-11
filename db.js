const mongoose = require("mongoose");
const config = require("./database/mongodb");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log("Connected to MongoDB");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    console.log(data);    
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
