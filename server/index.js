const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/jwtAuth'));
app.use('/newsfeed', require('./routes/newsfeed'));

// serve

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
