const express = require('express');
const cors = require('cors');
require('dotenv').config();

// const dataRoutes = require('./routes/dataRoutes');
const roomRoutes = require('./routes/roomRoutes')
const app = express();
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/data', dataRoutes);

app.use( roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

