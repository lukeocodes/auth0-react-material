const parser = new (require('rss-parser'))();
const cache = require('memory-cache');

const videos = async (req, res, next) => {
  let videos = cache.get('videos');

  if (videos === null) {
    const response = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCUlQ5VoIzE_kFbYjzUwHTKA');
    videos = response.items;
    cache.put('videos', videos, 1000 * 60 * 60);
  }

  if (req.user !== undefined) {
    const VideoModel = require('../schemas/video');
    const favouriteVideos = await VideoModel.find({ favourite: true, user: req.user.sub }).then(data => { return data; });

    videos = videos.map((video) => {
      return favouriteVideos.find(obj => video.id === obj.id) || video;
    });
  }

  req.data = videos;
  next();
};

module.exports = videos;
