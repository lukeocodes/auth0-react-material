const parser = new (require('rss-parser'))();
const cache = require('memory-cache');

const videos = async (req, res, next) => {
  let videos = cache.get('videos');
  const user = req.user;

  if (videos === null) {
    const response = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCUlQ5VoIzE_kFbYjzUwHTKA');
    videos = response.items;
    cache.put('videos', videos, 1000 * 60 * 60);
  }

  if (req.user !== undefined) {
    const VideoModel = require('../schemas/video');
    const favouriteVideos = await VideoModel.find({ favourite: true, user: req.user.sub }).then(data => { return data; });

    videos.forEach((video, key, videos) => {
      videos[key].favourite = false;
      favouriteVideos.find(o => {
        videos[key].favourite = (o.id === video.id);
      });
    });
  }

  req.data = videos;
  next();
};

module.exports = videos;
