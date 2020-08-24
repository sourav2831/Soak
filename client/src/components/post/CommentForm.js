import React, { useState, Fragment } from 'react'
import useStyles from '../../util/theme'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommentForm(props) {
  const classes = useStyles()
  const [comment, setComment] = useState("")
  const [loading,setLoading]=useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const userDetails = {
      userName: props.userName,
      comment:comment
    }
    axios.post(`/api/user/post/${props.postId}`, userDetails)
      .then((res) => {
        setLoading(false)
        setComment("")
        window.location.reload()
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
            Submit
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