import React, { useState, Fragment } from 'react'
import useStyles from '../../util/theme'
import axios from 'axios'
import Comments from './Comments'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommentForm(props) {
  const classes = useStyles()
  const [commentCount, setCommentCount] = useState(props.comment)
  const [comment, setComment] = useState("")
  const [newComment,setNewComment]=useState(props.comments)
  const [loading,setLoading]=useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const userDetails = {
      userName: props.userName,
      comment:comment
    }
    const makeComment = {
      userName:props.userName,
        comment: comment,
      createdAt:new Date().getTime()
    }
    axios.post(`/api/user/post/${props.postId}`, userDetails)
      .then((res) => {
        setLoading(false)
        setCommentCount(commentCount+1)
        setNewComment((prevComments) => {
          return [
            makeComment,
            ...prevComments
          ]
        })
        setComment("")
        // window.location.reload()
      })
      .catch((err) => {
      console.log(err);
    })
  }
  function handleChange(event) {
    event.preventDefault() 
    event.persist()
    setComment(event.target.value)
  }
  return (
    <Fragment>
      <span>{commentCount} Comments</span>
      <Comments comments={newComment}/>
            <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on post"
            value={comment}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Comment
            {loading && (
                <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    </Fragment>
  )
}

export default CommentForm