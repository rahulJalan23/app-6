const db = require('../db');
const { DataTypes } = require('sequelize');

const Transaction = db.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['paid', 'recieved']],
        msg: 'Must be "paid" or "recieved"',
      },
    },
  },
  partyId: DataTypes.UUID,
});

module.exports = Transaction;
