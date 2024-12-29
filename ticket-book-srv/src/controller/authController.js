// import User from '../model/userModel.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Signup - Create a new user
// export const signup = async (req, res) => {
//   try {
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       phone: req.body.phone,
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'User created successfully',
//       user,
//     });

//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Login - Authenticate user and generate JWT
// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET, 
//       { expiresIn: '24h' } 
//     );

//     res.status(200).json({ user : user.name, password : user.password, token: token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup - Create a new user
export const signup = async (req, res) => {
  try {
    // Inline validation for required fields
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login - Authenticate user and generate JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Inline validation for required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: 'Login successful',
      user: user.name, 
      token: token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
