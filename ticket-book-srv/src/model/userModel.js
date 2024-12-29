// import mongoose from 'mongoose';


// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
// });

// const User = mongoose.model('User', UserSchema);
// export default User;

import mongoose from 'mongoose';

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], // Custom error message
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'], 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      'Please enter a valid email address' 
    ],
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'], 
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [
      /^\d{10}$/, 
      'Phone number must be exactly 10 digits' 
    ],
  },
});

// Define the User model
const User = mongoose.model('User', UserSchema);
export default User;
