const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const kabelRoutes = require('./routes/kabel');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static('public'));

app.use('/', userRoutes);
app.use('/kabel', kabelRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`program running on port ${port}`);
});
