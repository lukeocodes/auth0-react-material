const router = require('express').Router();
const videos = require('../utils/videos');
const auth = require('../utils/auth');
const bodyParser = require('body-parser');
const userProfile = require('../utils/userProfile');

router.get('/videos', videos, (req, res) => {
  res.json(req.data);
});

router.get('/videos/favourites', auth, videos, (req, res) => {
  res.json(req.data);
});

const toggleFavourite = async (req, favourite) => {
  const VideoModel = require('../schemas/video');
  const profile = await userProfile(req);
  let video;

  video = await VideoModel.findOne({ id: req.body.id, user: profile.email }).then(obj => { return obj });

  if (!video) {
    video = new VideoModel(req.body);
  }

  video.favourite = favourite;
  video.save(err => {if (err) console.log(err)});

  return video;
};

router.post('/videos/favourite', auth, bodyParser.json(), async (req, res) => {
  const body = await toggleFavourite(req, true);

  res.json(body);
});

router.post('/videos/unfavourite', auth, bodyParser.json(), async (req, res) => {
  const body = await toggleFavourite(req, false);

  res.json(body);
});


module.exports = router;
