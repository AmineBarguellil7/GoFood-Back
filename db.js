const mongoose = require("mongoose");
const config = require("./database/mongodb");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log("Connected to MongoDB");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    await fetched_data.find({}).toArray(); 
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
