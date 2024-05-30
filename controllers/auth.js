const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtExpire, jwtSecret } = require('../config/keys');

exports.signupController = async (req, res) => {
  const { name, userId, email, age ,password } = req.body;
  try {
    const userEmail = await User.findOne({  email });
    const userID = await User.findOne({userId});
    if (userEmail || userID) {
      return res.status(400).json({
        error: 'Use another Email or User name',
      });
    }

    const newUser =  new User();
    newUser.name = name;
    newUser.userId = userId;
    newUser.email = email;
    newUser.age = age;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.json({
      message: 'Signup success! Please signin',
    });
  } catch (error) {
    console.log('signupController error', error)
    res.status(500).json({
      error: 'Error saving user in database. Try signup again',
    });
  }
}

exports.signinController = async (req, res) => {
  console.log(req.body);
  const { email, userId, password } = req.body;
  try {
    let user = await User.findOne({  email });
    const user1 = await User.findOne({userId}); 
    if(!user){
      user = user1;
    }   
    if (!user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Email and password do not match',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) {
        console.log('jwt error', err);
      }
      const { _id, name, userId, email, age,video , blockedTags} = user;
      return res.json({
        token,
        user: { _id,  name, userId, email, age, video },
      });
    });

    // res.json({
    //   message: 'Signin success',
    // });
  } catch (error) {
    console.log('signinController error', error)
    res.status(500).json({
      error: 'Server error. Try signin again',
    });
  }
}