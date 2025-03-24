const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metodları
    allowedHeaders: ['Content-Type', 'Authorization'] // İzin verilen başlıklar
}));

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requirements', require('./routes/academicRequirementsRoutes'));	
app.use('/api/ilanlar', require('./routes/ilanlarRoutes'));
app.use('/api/basvurular', require('./routes/basvuruRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})