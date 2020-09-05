import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from "../../util/AuthCheck";
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';
import AppIcon from '../../images/icon.jpg';
import useStyles from "../../util/theme"
import { removeCookie, removeLocalStorage } from "../../util/AuthCheck";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonIcon from '@material-ui/icons/Person';

function Navbar(props) {
  const classes = useStyles();
  function handleLogout() {
    removeCookie("token")
    removeLocalStorage("user")
    window.location.reload()
  }
  return (
    <AppBar>
      <Toolbar className="nav-container">
      <Button color = "inherit" component = { Link } to = "/" className="nav-container2"> 
          <img src={AppIcon} alt="Soak Icon" className={classes.image3} />
          <span style={{padding:"10px"}}>Soak</span>
      </Button>
        {
          isAuth() ? (
            <Fragment>
              <Link to="/add-post">
              <MyButton tip="Add Post">
                <PostAddIcon />
              </MyButton>
              </Link>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
              <Link to="/profile">
              <MyButton tip="Profile">
                <PersonIcon/>
              </MyButton>
              </Link>
              <Button color="inherit" onClick={handleLogout} >
              Logout
            </Button>
            </Fragment>
          ): (
              <Fragment>
        <Button color = "inherit" component = { Link } to = "/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Signup
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      </Fragment>
      )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar