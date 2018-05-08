const express = require('express');
const cors = require('cors');
const config = require('config');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(config.mlabConnectionString);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const corsOptions = {
  origin: config.corsOrigin,
};

app.use(cors(corsOptions));

const videos = require('./controllers/videos');
app.use('/', videos);

const port = config.nodePort;
app.listen(port, () => console.log(`Listening on port ${port}`));