import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { Card, CardMedia, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const API = 'http://localhost:3001';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: this.props.video,
    };
  }

  handleFavourite = (video) => {
    const { auth } = this.props;
    if (this.props.auth.isAuthenticated()) {
      const config = {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({...video, user: auth.userProfile.email})
      };

      let route = `${API}/videos/favourite`;

      if (video.favourite) {
        route = `${API}/videos/unfavourite`;
      }

      fetch(route, config)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          return response.json();
        })
        .then(data => this.setState({ video: data}));
    }
  };

  render() {
    const { video } = this.state;
    const { isAuthenticated } = this.props.auth;
    const actions = isAuthenticated() ? (
      <CardActions>
        <FlatButton
          label='Favourite'
          onClick={this.handleFavourite.bind(this, video)}
          fullWidth={true}
          secondary={video.favourite}
          labelPosition='before'
          icon={<ActionGrade />}
        />
      </CardActions>
    ) : ( '' );

    return (
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
        {actions}
      </Card>
    );
  }
}

export default Video;
