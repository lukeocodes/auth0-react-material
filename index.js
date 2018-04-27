const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://videos:Password1@ds143388.mlab.com:43388/auth0-videos');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
};

app.use(cors(corsOptions));

const videos = require('./controllers/videos');
app.use('/', videos);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));