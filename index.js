const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
}

app.use(cors(corsOptions));

const videos = require('./controllers/videos');
app.use('/', videos);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));