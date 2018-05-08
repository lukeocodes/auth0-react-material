import React, { Component } from 'react';
import Video from './Video';
import config from '../config';

class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    const reqConfig = { headers: {} };

    if (this.props.auth.isAuthenticated()) {
      reqConfig.headers.Authorization = `Bearer ${this.props.auth.accessToken}`;
    }

    fetch(`${config.apiUrl}/videos`, reqConfig)
      .then(response => response.json())
      .then(data => this.setState({ videos: data }));
  }

  render() {
    const { videos } = this.state;

    return (
      <div>
        {videos.map(video =>
          <Video
            key={video.id}
            video={video}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default Videos;