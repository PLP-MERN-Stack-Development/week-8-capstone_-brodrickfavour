// backend/config/db.js
const mongoose = require('mongoose'); // Import Mongoose library

/**
 * @desc Connects to the MongoDB database using the URI from environment variables.
 * @returns {void}
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the MONGO_URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are recommended to avoid deprecation warnings
      useNewUrlParser: true,      // Ensures MongoDB driver uses the new URL parser
      useUnifiedTopology: true,   // Uses the new server discovery and monitoring engine
      // useCreateIndex: true,    // Mongoose 6+ deprecates this, no longer needed
      // useFindAndModify: false  // Mongoose 6+ deprecates this, no longer needed
    });

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any connection errors
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with a failure code if connection fails
    process.exit(1);
  }
};

module.exports = connectDB; // Export the connectDB function for use in server.js