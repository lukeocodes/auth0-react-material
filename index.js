const express = require('express');
const app = express();

const videos = require('./controllers/videos');
app.use('/', videos);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));