const parser = new (require('rss-parser'))();
const cache = require('memory-cache');

const videos = async (req, res, next) => {
  let videos = cache.get('videos');

  if (videos === null) {
    videos = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCUlQ5VoIzE_kFbYjzUwHTKA');
    cache.put('videos', videos, 1000 * 60 * 60); // 1 hour
  }

  req.data = videos;
  next();
};

module.exports = videos;
