const express = require('express');
const multer = require('multer');
const path = require('path'); 
const router = express.Router();
const User = require('../models/user');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/'; 
    cb(null, uploadPath);  
  },
  filename: function (req, file, cb) {
  
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: storage });


router.use('/uploads', express.static(path.join(__dirname, '../uploads')));


console.log('Serving static files from:', path.join(__dirname, '../uploads'));


router.post('/register', upload.single('file'), async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      confirmPassword, 
      selectedOption, 
      dateOfBirth, 
      gender, 
      bio, 
      rangeValue 
    } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

   
    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;  
    }

   
    const newUser = new User({
      fullName,
      email,
      password,
      confirmPassword,
      selectedOption,
      dateOfBirth,
      gender,
      bio,
      rangeValue,
      file: fileUrl,  
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);

    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
