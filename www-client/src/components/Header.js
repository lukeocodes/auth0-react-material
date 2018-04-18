// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const Header = () => (
//   <header>
//     <h1>Welcome to React</h1>
//     <nav>
//       <ul>
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='/videos'>Videos</Link></li>
//       </ul>
//     </nav>
//   </header>
// );
//
// export default Header;
//
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <header>
        <AppBar
          title="Welcome to React"
          iconElementLeft={<IconButton
            label="Open Drawer"
            onClick={this.handleToggle}
          ><MenuIcon /></IconButton>}
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem
            linkButton
            containerElement={<Link to='/' />}
            primaryText="Home"
            onClick={this.handleClose}
          />
          <MenuItem
            linkButton
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

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
// import MenuIcon from 'material-ui/svg-icons/navigation/menu';
//
// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {open: false};
//   }
//
//   handleToggle = () => this.setState({open: !this.state.open});
//
//   handleClose = () => this.setState({open: false});
//
//   render() {
//     return (
//       <header>
//         <AppBar
//           title="Welcome to React"
//           iconElementLeft={<IconButton
//             label="Open Drawer"
//             onClick={this.handleToggle}
//           ><MenuIcon /></IconButton>}
//         />
//         <Drawer
//           docked={false}
//           open={this.state.open}
//           onRequestChange={(open) => this.setState({open})}
//         >
//           <MenuItem
//             linkButton
//             containerElement={<Link to='/' />}
//             primaryText="Home"
//             onClick={this.handleClose}
//           />
//           <MenuItem
//             linkButton
//             containerElement={<Link to='/videos' />}
//             primaryText="Videos"
//             onClick={this.handleClose}
//           />
//         </Drawer>
//       </header>
//     );
//   }
// }
//
// export default Header;