import React, { useState, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import NotificationsIcon from '@material-ui/icons/Notifications';

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    axios.get(`/api/user/notifications/${userInfo._id}`)
      .then((res) => {
      setNotifications(res.data.notifications[0].notifications)
      })
      .catch((err) => {
      console.log(err);
    })
  },[])
  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault()
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <NotificationsIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >{
          notifications.length !== 0 ? (
            notifications.map((notification) => {
            let icon
                notification.newNotification.includes("liked") ? (
                  icon=<FavoriteIcon color='primary' style={{ marginRight: 10 }} />
                ) : (
                  icon=<ChatIcon color='primary' style={{ marginRight: 10 }} />
                )
              return (
                <MenuItem onClick={handleClose}>{icon} {notification.newNotification}</MenuItem>
              )
            })
          )
            : (
              <MenuItem onClick={handleClose}>You have no notifications yet!!</MenuItem>
            )
      }
      </Menu>
  </Fragment>
  )
}

export default Notifications