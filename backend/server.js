const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requirements', require('./routes/academicRequirementsRoutes'));	
app.use('/api/ilanlar', require('./routes/ilanlarRoutes'));
app.use('/api/basvurular', require('./routes/basvuruRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/jury-assignments', require('./routes/juryAssignmentRoutes'));

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'akbs',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB bağlantısı başarılı.");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Sunucu ${process.env.PORT || 5000} portunda çalışıyor.`);
  });
})
.catch(err => console.error("MongoDB bağlantı hatası:", err));
