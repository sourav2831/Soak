import React, { useState, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import useStyles from "../../util/theme"
import axios from "axios"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

function EditDetails(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({
    userName:props.userName,
    bio: props.bio,
    website: props.website,
    location: props.location
  })
  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }
  function handleChange(event) {
    event.preventDefault() 
    event.persist()
    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [event.target.name]:event.target.value
      }
    })
  }
  function handleSubmit() {
    axios.post("/api/user/details", details)
      .then((res) => {
        setOpen(false)
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
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button2}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={details.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={details.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={details.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditDetails