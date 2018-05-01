const router = require('express').Router();
const videos = require('../utils/videos');
const auth = require('../utils/auth');
const bodyParser = require('body-parser');

router.get('/videos', auth.optional, videos, (req, res) => {
  res.json(req.data);
});

const toggleFavourite = async (req, favourite) => {
  const VideoModel = require('../schemas/video');
  let video = await VideoModel.findOne({ id: req.body.id, user: req.user.sub }).then(obj => { return obj });

  if (!video) {
    video = new VideoModel(req.body);
  }

  video.favourite = favourite;
  video.save(err => {if (err) console.log(err)});

  return video;
};

router.post('/videos/favourite', auth.required, bodyParser.json(), async (req, res) => {
  const body = await toggleFavourite(req, true);

  res.json(body);
});

router.post('/videos/unfavourite', auth.required, bodyParser.json(), async (req, res) => {
  const body = await toggleFavourite(req, false);

  res.json(body);
});

module.exports = router;
