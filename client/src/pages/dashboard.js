import React, { useState, useEffect } from 'react';
import axios from "axios"
import Post from "../components/post/Post"
import Profile from "../components/profile/Profile"
import PostSkeleton from "../util/PostSkeleton"
import ProfileSkeleton from "../util/ProfileSkeleton"

import Grid from '@material-ui/core/Grid';

function Dashboard() {
    const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading2,setLoading2]=useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get("/api/user/post/get")
        .then((res) => {
        setLoading(false)
        setPosts(res.data)
      }).then((res) => {
        const userInfo = JSON.parse(localStorage.getItem("user"))
        setLoading2(true)
          axios.get(`/api/user/${userInfo._id}`)
            .then((res) => {
                setLoading2(false)
                setUserData(res.data)
        })
    })
      .catch((err) => { 
      console.log(err);
    })
  },[])

  return (
    <Grid container > 
      <Grid item sm={1} />
      <Grid item sm={6} xs={12}>
        {!loading ? (
          posts.length !== 0 && userData.length !== 0 &&
          posts["posts"].map((post) => {
            return <Post
              key={post._id}
              post={post}
              userName={userData.userData.userName}
            />
          })
        ) : (
            <PostSkeleton />
        )
        }
      </Grid>
          <Grid item sm={4} xs={12}>
        {userData.length !== 0 && !loading2 ? (
          <Profile userData={userData} loading={loading2} />
        ) : (
            <ProfileSkeleton />
              )
           
              }
        
      </Grid>
      <Grid item sm={1} />
    </Grid>
  )
}

export default Dashboard