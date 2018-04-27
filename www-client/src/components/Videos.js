import React, { Component } from 'react';
import Video from './Video';

const API = 'http://localhost:3001';

class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    const config = { headers: {} };
    let route = `${API}/videos`;

    if (this.props.auth.isAuthenticated()) {
      config.headers.Authorization = `Bearer ${this.props.auth.accessToken}`;
      route = `${API}/videos/favourites`;
    }

    fetch(route, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(data => this.setState({ videos: data }))
      .catch(err => console.error());
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