const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:8100', 'http://localhost:8101','http://localhost:8000'],  
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
}));

app.use(express.json());  
 

mongoose.connect("mongodb+srv://deepeshhial15:6261920444@cluster0.pwwo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
