const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Now connect to ${conn.connection.host} on port ${conn.connection.port}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
