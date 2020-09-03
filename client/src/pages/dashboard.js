import React, { useState, useEffect } from 'react';
import axios from "axios"
import Post from "../components/post/Post"
import PostSkeleton from "../util/PostSkeleton"


import Grid from '@material-ui/core/Grid';

function Dashboard() {
    const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get("/api/user/post/get")
        .then((res) => {
        setLoading(false)
        setPosts(res.data)
      }).then((res) => {
        const userInfo = JSON.parse(localStorage.getItem("user"))
          axios.get(`/api/user/${userInfo._id}`)
            .then((res) => {
                setUserData(res.data)
        })
    })
      .catch((err) => { 
      console.log(err);
    })
  },[])

  return (
    <Grid container > 
      <Grid item sm={2} />
      <Grid item sm={8} xs={12}>
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
      <Grid item sm={2} />
    </Grid>
  )
}

export default Dashboard