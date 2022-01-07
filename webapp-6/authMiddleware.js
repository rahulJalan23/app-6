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
    if (!user) {
      // console.log(user);
      return res.status(403).send({
        error:
          'Unable to find User using the Access Token. Such a User is not registered.',
        success: false,
      });
    }
    req.user = user;
    // console.log('FROM AUTH ', decode);
  } catch (err) {
    res.status(401).send({ message: 'Error Decoding Token', err });
  }
  next();
};

module.exports = { authMiddleware };
