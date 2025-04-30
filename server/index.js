// server/index.js

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// ✅ CORS configuration for local + Azure deployments
const allowedOrigins = [
  'http://localhost:3000',
  'https://gentle-smoke-0be6c8610.6.azurestaticapps.net'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman) or matching origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS BLOCKED from:', origin);
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ✅ API route handlers antey
const roomsRoute = require('./routes/rooms');
const reservationsRoute = require('./routes/reservations');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/User');
const feedbackRoutes = require('./routes/feedback');
const notificationRoutes = require('./routes/notification');

// ✅ Route bindings
app.use('/api', roomsRoute);
app.use('/api/admin', adminRoute);
app.use('/api/reservations', reservationsRoute);
app.use('/api/user', userRoute);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Classroom Reservation API is up and running!');
});

// ✅ Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
