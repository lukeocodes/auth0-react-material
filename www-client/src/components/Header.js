import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  handleLogin = () => this.props.auth.login();

  handleLogout = () => this.props.auth.logout();

  render() {
    const { isAuthenticated, userProfile } = this.props.auth;
    let avatar = '';

    if (userProfile) {
      avatar = <Avatar src={userProfile.picture} size={30} />
    }

    const button = !isAuthenticated() ? (
      <FlatButton label="Log in" onClick={this.handleLogin.bind(this)} />
    ) : (
      <FlatButton label="Log out" onClick={this.handleLogout.bind(this)} icon={avatar} />
    );

    return (
      <header>
        <AppBar
          title="Welcome to React"
          iconElementLeft={<IconButton
            label="Open Drawer"
            onClick={this.handleToggle}
          ><MenuIcon /></IconButton>}
          iconElementRight={button}
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            containerElement={<Link to='/' />}
            primaryText="Home"
            onClick={this.handleClose}
          />
          <MenuItem
            containerElement={<Link to='/videos' />}
            primaryText="Videos"
            onClick={this.handleClose}
          />
        </Drawer>
      </header>
    );
  }
}

export default Header;
