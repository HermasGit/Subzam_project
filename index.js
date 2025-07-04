require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Serve static files from public directory
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/auth');
const productionRoutes = require('./src/routes/production');

app.use('/api/auth', authRoutes);
app.use('/api/production', productionRoutes);

// Serve staff.html as the default root page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'staff', 'staff.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
