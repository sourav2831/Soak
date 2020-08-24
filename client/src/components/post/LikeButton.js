import React, { useState,useEffect,Fragment } from 'react';
import MyButton from '../../util/MyButton';
import axios from "axios"

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function LikeButton(props) {
  const [like,setLike]=useState(props.like)
  const [userData, setUserData] = useState([])
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
    setLike(like-1)
    const userDetail = {
      userName:userData.userData.userName
    }
    axios.post(`/api/user/post/${props.postId}/like`, userDetail)
      .then((res) => {
        
      })
      .catch((err) => {
      console.log(err);
    }) 
  }
  function changeState2(event) {
    event.preventDefault()
    setLike(like+1)
    const userDetail = {
      userName:userData.userData.userName
    }
    axios.post(`/api/user/post/${props.postId}/like`, userDetail)
      .then((res) => {
        
      })
      .catch((err) => {
      console.log(err);
    }) 
  }
  const likeButton = userData.length !== 0 && likedOrNot(props.postId) ? (
    <Fragment >
    <MyButton tip="Undo like" onClick={changeState} >
      <FavoriteIcon color="primary" />
      </MyButton>
      <span >{like} Likes</span>
      </Fragment>
  ) : (
      <Fragment >
    <MyButton tip="Like" onClick={changeState2} >
        <FavoriteBorder color="primary" />
        </MyButton>
        <span>{like} Likes</span>
        </Fragment>
  );
  return likeButton;
}

export default LikeButton