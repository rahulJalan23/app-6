const app = require('./app');

const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`connected to the port ${PORT}`);
});
