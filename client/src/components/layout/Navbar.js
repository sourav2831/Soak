import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from "../../util/AuthCheck";
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

function Navbar() {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {
          isAuth() ? (
            <Fragment>
              <Button color="inherit" component={Link} to="/add-post">
                <AddIcon />
              </Button>
              <Link to="/">

                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
                <Notifications />
              </Link>
           
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