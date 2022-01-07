const { User } = require('../models/index');
const SECRET_JWT = 'my secret';
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    const userfind = await User.findOne({ where: { username } });
    if (userfind) {
      let ismatch = false;
      if (password == userfind.password) {
        ismatch = true;
      }

      if (ismatch) {
        const token = await jwt.sign({ id: userfind.id }, SECRET_JWT);
        // console.log('loggin in');
        // console.log(token);
        res.setHeader('token', token);
        res.send({ token, success: true, user: userfind });
      } else {
        res.json({ msg: 'password incorrect' });
      }
    } else {
      res.status(400).json({ success: false, message: 'No such user found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const test = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (test) {
      return res.send({ msg: 'User exists with the username' });
    }
    User.create({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    })
      .then(async (user) => {
        const token = await jwt.sign({ id: user.id }, SECRET_JWT);
        res
          .status(201)
          .send({ message: 'User Registered Successfully.', user, token });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { login, register };
