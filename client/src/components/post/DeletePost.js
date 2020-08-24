import React, { Fragment, useState } from 'react';
import MyButton from '../../util/MyButton';
import useStyles from "../../util/theme"
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

function DeletePost(props) {
  const classes = useStyles()
  const [open,setOpen]=useState(false)
  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }
  function deletePost() {
    const userDetails = {
      userName:props.userName
    }
    axios.post(`/api/user/post/${props.postId}/delete`, userDetails)
      .then((res) => {
        props.history.push("/")
        window.location.reload()
      })
      .catch((err) => {
      console.log(err);
    })
  }
  return (
    <Fragment>
    <MyButton
      tip="Delete Scream"
      onClick={handleOpen}
      btnClassName={classes.deleteButton}
    >
      <DeleteOutline color="secondary" />
    </MyButton>
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Are you sure you want to delete this post ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deletePost} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </Fragment>
  )
}

export default DeletePost