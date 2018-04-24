import React from 'react';
import YouTube from 'react-youtube';
import { Card, CardMedia } from 'material-ui/Card';

const Video = ({video}) => (
  <Card
    style={{
      width: '400px',
      padding: '10px',
      marginRight: '1em',
      marginBottom: '1em',
      textAlign: 'center',
      display: 'inline-block',
    }}>
    <CardMedia
    >
      <YouTube
        opts={{
          width: '380',
          height: '220',
        }}
        videoId={(video.id.split(":").pop())}
      />
    </CardMedia>
  </Card>
);

export default Video;
