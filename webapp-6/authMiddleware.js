const jwt = require('jsonwebtoken');
const { User } = require('./models');
const SECRET_JWT = 'my secret';

const authMiddleware = async (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (!token) {
    return res
      .status(400)
      .json({ msg: 'An access token is required. Please try again.' });
  }

  try {
    const decode = jwt.verify(token, SECRET_JWT);
    const user = await User.findOne({ where: { id: decode.id } });
    req.user = user;
    console.log('FROM AUTH ', decode);
  } catch (err) {
    res.status(401).send({ message: 'Error Decoding Token', err });
  }
  next();
};

module.exports = { authMiddleware };
