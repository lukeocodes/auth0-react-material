const router = require('express').Router();
const videos = require('../utils/videos');

router.get('/videos', videos, (req, res) => {
  res.json(req.data);
});

module.exports = router;
