const User = require('./user');
const Transaction = require('./transaction');
const db = require('../db');

User.hasMany(Transaction);
Transaction.belongsTo(User);

// db.sync();

module.exports = { User, Transaction };
