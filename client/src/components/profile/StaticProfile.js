import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import useStyles from "../../util/theme"
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const StaticProfile = ({ match }) => {
  const classes=useStyles()
  const [userData, setUserData] = useState({
    userName: "",
    createdAt: "",
    imageName: "",
    bio: "",
    location: "",
    website:""
  })
  useEffect(() => {
    setUserData((prevData) => {
      return {
        ...prevData,
        userName:match.params.userName
      }
    });
    axios.get(`/api/user/user-name/${match.params.userName}`)
      .then((res) => {
        setUserData((prevData) => {
          return {
            ...prevData,
            createdAt: res.data.userData.createdAt,
            imageName: res.data.userData.imageName,
            bio: res.data.userData.bio,
            location: res.data.userData.location,
            website:res.data.userData.website
        }
      })
    })// eslint-disable-next-line
  }, [match.params.token]);

  const userProfile = () => (
    <Grid container spacing={16}>
    <Grid item sm={4} xs={12} />
    <Grid item sm={4} xs={12}>
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={`/api/user/image/${userData.imageName}`} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink 
            component={Link}
            to={`/users/${userData.userName}`}
            color="primary"
            variant="h5"
          >
            @{userData.userName}
          </MuiLink>
          <hr />
          {userData.bio && <Typography variant="body2">{userData.bio}</Typography>}
          <hr />
          {userData.location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{userData.location}</span>
              <hr />
            </Fragment>
          )}
          {userData.website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={userData.website} target="_blank" rel="noopener noreferrer">
                {' '}
                {userData.website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(userData.createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
      </Grid>
      <Grid />
  </Grid>
  );

  return (
      <div >
      { userData.userName!=="" &&
        userProfile()
      }
      </div>
  );
};

export default StaticProfile;