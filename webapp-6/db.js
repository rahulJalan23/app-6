const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodedemo', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkConnection();
module.exports = sequelize;
