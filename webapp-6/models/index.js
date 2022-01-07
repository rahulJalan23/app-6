const User = require('./user');
const Transaction = require('./transaction');
const db = require('../db');

User.hasMany(Transaction);
Transaction.belongsTo(User);

db.sync({ force: true });

module.exports = { User, Transaction };
