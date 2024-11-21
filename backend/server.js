const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: 'OLA DE LA BACKEND' });
});

app.listen(port, () => {
  console.log(`Serverul merge pe http://localhost:${port}`);
});