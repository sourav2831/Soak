import React, { useState,Fragment,useEffect } from 'react';
import useStyles from "../../util/theme"
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import axios from "axios"
import { removeCookie, removeLocalStorage } from "../../util/AuthCheck";
import EditDetails from './EditDetails'
import ProfileSkeleton from "../../util/ProfileSkeleton"

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


function Profile() {
  const classes = useStyles()
  const [userData, setUserData] = useState({userData:{
    userName: "",
    createdAt: "",
    imageName: "",
    bio: "",
    location: "",
    website:""
  }})
  const [loading2, setLoading2] = useState(false)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    setLoading2(true)
    axios.get(`/api/user/${userInfo._id}`)
    .then((res) => {
        setLoading2(false)
      setUserData(res.data)
    }) 
      .catch((err) => {
      console.log(err);
    })
  },[])
  const { userName, createdAt, imageName, bio, location, website } = userData.userData
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
  let profile = !loading2 ? (!loading ? (
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
    (
      <CircularProgress
        size={100}
        className={classes.progressSpinner2}
      />
    )
    )) : (
      <ProfileSkeleton />
  );

  return (
    <Grid container spacing={16}>
      <Grid sm={4} />
      <Grid sm={4} xs={12}>
      {profile}
      </Grid>
      <Grid sm={4} />
      </Grid>
      )
      }

export default Profile