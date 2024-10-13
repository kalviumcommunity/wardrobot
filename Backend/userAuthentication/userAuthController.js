const express = require('express')
const User = require('./userAuthSchema')

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRECT = process.env.JWT_SECRECT;


const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res
        .status(422)
        .json({ error: 'User already exists with that email' });
    }
    const existingUserByUsername = await User.findOne({ where: { userName } });
    if (existingUserByUsername) {
      return res
        .status(422)
        .json({ error: 'User already exists with that username' });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
    });
    res.status(200).json({ user: newUser, message: 'Registered Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const normalizedEmail = email.trim().toLowerCase();
        const users = await User.find();
        let user = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === normalizedEmail) {
                user = users[i];
                break;
            }
        }
        if (!user) {
            return res.status(401).json({ error: "User Not Found with Given email" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRECT,
            { expiresIn: "7d" }
        );
        res.status(200).json({ token, message: "Login Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const fetchUserDetails = async (req, res) => {
  const { email } = req.body; 

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await User.find(); 
    let user = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === normalizedEmail) {
        user = users[i];
        break; 
      }
    }
    if (!user) {
      return res.status(401).json({ error: "User not found with the given email" });
    }
    return res.status(200).json({ userName: user.userName });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};




module.exports = { registerUser, loginUser ,fetchUserDetails};
