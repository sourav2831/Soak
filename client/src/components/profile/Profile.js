import React, { useState,Fragment } from 'react';
import useStyles from "../../util/theme"
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import axios from "axios"
import { removeCookie, removeLocalStorage } from "../../util/AuthCheck";
import EditDetails from './EditDetails'

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

function Profile(props) {
  const classes = useStyles()
  const { userName, createdAt, imageName, bio, location, website } = props.userData.userData
  const [loading,setLoading]=useState(false)
  function handleImageChange(event) {
    setLoading(true)
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('myImage', image, image.name)
    formData.append('userName', userName)
    axios.post("/api/image-upload", formData)
      .then((res) => {
        setLoading(false)
        window.location.reload();
      })
      .catch((err) => {
      console.log(err);
    })
  }
  function handleEditPicture(event) {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  function handleLogout() {
    removeCookie("token")
    removeLocalStorage("user")
    window.location.reload();
  }
  let profile = !loading ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={`/api/user/image/${imageName}`} alt="profile" className="profile-image" />
          <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${userName}`}
            color="primary"
            variant="h5"
          >
            @{userName}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        <MyButton tip="Logout" onClick={handleLogout}>
              <KeyboardReturn color="primary" />
        </MyButton>
        <EditDetails userName={userName} bio={bio} location={location} website={website} />
      </div>
    </Paper>
  ): (
    <div>loading...</div>
  );

  return profile
}

export default Profile