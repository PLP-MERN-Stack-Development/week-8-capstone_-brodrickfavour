// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // For handling file paths (e.g., Cloudinary uploads)

// Route Imports
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const kitRoutes = require('./routes/kits');
const contactRoutes = require('./routes/contact');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing URL-encoded data

// --- Production-Ready CORS Configuration ---
// Define a whitelist of allowed origins.
const allowedOrigins = [
  'http://localhost:3000', // Your local frontend (e.g., Create React App)
  'http://localhost:5173', // Your local frontend (e.g., Vite)
  process.env.ecogasafrica_up_railway_app, // Your deployed frontend URL from Railway
].filter(Boolean); // Removes any falsy values like undefined if FRONTEND_URL is not set

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) or from the whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Important for sending cookies or auth headers
};

app.use(cors(corsOptions));
// Set static folder (if serving local images later, though Cloudinary is used)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/kits', kitRoutes);
app.use('/api/contact', contactRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces, which is crucial for containerized environments like Railway
// and for local testing from other devices on your network.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});