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
  editTransactionById,
  getTransactionByUser,
  getTransactionById,
  deleteTransactionById,
} = require('./controllers/transaction');

app.use(morgan('dev'));

app.post('/auth/login', login);
app.post('/auth/register', register);

app.post('/transaction/create', authMiddleware, addTransaction);
app.get('/transaction/get', authMiddleware, getTransactionByUser);
app.get('/transaction/:id', authMiddleware, getTransactionById);
app.put('/transaction/:id', authMiddleware, editTransactionById);
app.delete('/transaction/:id', authMiddleware, deleteTransactionById);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'Welcome to the  API.',
  });
});

module.exports = app;
