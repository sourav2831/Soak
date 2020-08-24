import React, { useState,useEffect,Fragment } from 'react';
import MyButton from '../../util/MyButton';
import useStyles from '../../util/theme';
import axios from "axios"

import CircularProgress from '@material-ui/core/CircularProgress';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function LikeButton(props) {
  const classes=useStyles()
  const [like,setLike]=useState(props.like)
  const [userData, setUserData] = useState([]) 
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    axios.get(`/api/user/${userInfo._id}`)
      .then((res) => {
      setUserData(res.data)
    })
      .catch((err) => {
      console.log(err);
    })
  }, [userData])
  
  function likedOrNot(postId) {
    const check = userData.userData.likedPost.find((item) => {
      return postId===(item.postId)
    })
    return check
  } 
  function changeState(event) {
    event.preventDefault()
    setLoading(true)
    setLike(like-1)
    const userDetail = {
      userName:userData.userData.userName
    }
    axios.post(`/api/user/post/${props.postId}/like`, userDetail)
      .then((res) => {
        setLoading(false)
      })
      .catch((err) => {
      console.log(err);
    }) 
  }
  function changeState2(event) {
    event.preventDefault()
    setLoading(true)
    setLike(like+1)
    const userDetail = {
      userName:userData.userData.userName
    }
    axios.post(`/api/user/post/${props.postId}/like`, userDetail)
      .then((res) => {
        setLoading(false)
      })
      .catch((err) => {
      console.log(err);
    }) 
  }
  const likeButton = userData.length !== 0 && likedOrNot(props.postId) ? (
    <Fragment >
      { !loading ? 
        <Fragment>
        <MyButton tip="Undo like" onClick={changeState} >
      <FavoriteIcon color="primary" />
      </MyButton>
          <span >{like} Likes</span>
        </Fragment> : (<Fragment>
          <MyButton >
      <FavoriteIcon color="primary" />
      </MyButton>
          <span >{like} Likes</span>
          <CircularProgress size={30} className={classes.progress} />
        </Fragment>
          )
    }

      </Fragment>
  ) : (
      <Fragment >
        { !loading ?
          <Fragment>
        <MyButton tip="Like" onClick={changeState2}  >
        <FavoriteBorder color="primary" />
        </MyButton>
          <span>{like} Likes</span>
          </Fragment> : (
            <Fragment>
            <MyButton   >
        <FavoriteBorder color="primary" />
        </MyButton>
          <span >{like} Likes</span>
          <CircularProgress size={30} className={classes.progress} />
        </Fragment>
          )
        }
        </Fragment>
  );
  return likeButton;
}

export default LikeButton