import React, { Component } from 'react';
import Video from './Video';

const API = 'http://localhost:3001/videos';

class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ videos: data.items }));
  }

  render() {
    const { videos } = this.state;

    return (
      <div>
        {videos.map(video =>
          <Video
            key={video.id}
            video={video}
          />
        )}
      </div>
    );
  }
}

export default Videos;