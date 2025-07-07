require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/auth');
const productionRoutes = require('./src/routes/production');

app.use('/api/auth', authRoutes);
app.use('/api/production', productionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
