import React from 'react';
import NoImg from '../images/no-img.png';
import useStyles from "../util/theme"

import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


const ProfileSkeleton = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle2} />
          <hr />
          <div className={classes.fullLine2} />
          <div className={classes.fullLine2} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;