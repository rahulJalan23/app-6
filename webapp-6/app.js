const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const db = require('./db');
const { authMiddleware } = require('./authMiddleware');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { login, register } = require('./controllers/auth');
const {
  addTransaction,
  getTransactionByUser,
} = require('./controllers/transaction');

app.use(morgan('dev'));

app.post('/auth/login', login);
app.post('/auth/register', register);

app.post('/transaction/create', authMiddleware, addTransaction);
app.post('/transaction/get', authMiddleware, getTransactionByUser);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Welcome to the  API.',
  });
});

module.exports = app;
