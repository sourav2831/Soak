import React, { useState, useEffect, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import useStyles from '../../util/theme'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

function AddPost() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState("")
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
  }, [])

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  function handleChange(event) {
    event.preventDefault() 
    event.persist()
    setCaption(event.target.value)
  }
  function handleImageChange(event) {
    const image = event.target.files[0];
    setLoading(true)
    const formData = new FormData();
    formData.append('myImage', image, image.name)
    formData.append('userName', userData.userData.userName)
    formData.append("caption",caption)
    axios.post("/api/user/post", formData)
      .then((res) => {
        setLoading(false)
        setOpen(false)
        setCaption("")
        toast.success("Post added successfully");
    })
    .catch((err) => {
    console.log(err);
  })
  }
  function handleEditPicture(event) {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  return (
    <Grid container>
      <Grid item sm={3} xs={2}/>
      <Grid item sm={6} xs={8} >
      <Paper className={classes.paper}>
          <Fragment >
            <center>
              <h2 style={{ color : 'green' }}>Add a post</h2>
            <MyButton onClick={handleOpen} tip="Add a Post!">
      <AddIcon />
     </MyButton>
            </center>
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <MyButton
        tip="Close"
        onClick={handleClose}
        tipClassName={classes.closeButton}
      >
        <CloseIcon />
      </MyButton>
      <DialogTitle>Add a new post</DialogTitle>
      <DialogContent>
          <TextField
            name="body"
            type="text"
            label="Caption"
            multiline
            rows="3"
            placeholder="Add a caption"
            value={caption}  
            className={classes.textField}
            onChange={handleChange}
            fullWidth
          />
    <input
    type="file"
    id="imageInput"
    hidden="hidden"
    onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleEditPicture} color="primary">
        <AddIcon color="primary" />
          </Button>
          </DialogActions>
          {loading && (
              <CircularProgress
                size={100}
                className={classes.progressSpinner2}
              />
            )}
        </Dialog>
        </Fragment>
      </Paper>
      </Grid>
      <Grid item sm={3} >
        <ToastContainer />
        </Grid>
      </Grid>
  )
}

export default AddPost