import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import useStyles from "../util/theme"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


function Forgot(props) {
  const classes = useStyles();
  const [credentials,setCredentials]=useState({
          email: '',
          loading: false,
          errors: {}
  })
  const { errors, loading } = credentials
  function handleSubmit(event) {
    event.preventDefault()
    setCredentials((prevCredentials) => {
      return { 
        ...prevCredentials,
        loading: true
      }
    })
    const userData = {
      email: credentials.email,
    };
    axios.post("/api/user/forgot-password", userData)
      .then((response) => {
        setCredentials((prevCredentials) => {
          return {
            ...prevCredentials,
            loading: false
          }
        })
        toast.success(response.data.message);
      })
      .catch((err) => {
        setCredentials((prevCredentials) => {
          return {
            ...prevCredentials,
            errors:err.response.data,
            loading: false
          }
        })
    })
  }


  function handleChange(event) {
    event.preventDefault() 
    event.persist()
    setCredentials( (prevCredentials) => {
      return {
        ...prevCredentials,
          [event.target.name]: event.target.value
      }
    });
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm >
        <img src={AppIcon} alt="Soak Icon" className={classes.image} />
        <Typography variant="h5" className={classes.pageTitle}>
          Reset the password by Email
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={JSON.stringify(errors) === '{}'?errors.error:errors.error.email}
              error={JSON.stringify(errors) === '{}'?false:errors.error.email ? true : false}
              value={credentials.email}
              onChange={handleChange}
              fullWidth
          />
            {`${errors.error}`!=="undefined" && `${errors.error}`!=="[object Object]" && (
            <Typography  variant="body2" className={classes.customError}>
            {`${errors.error}`}
              </Typography>
            )}
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
          <br/>
            <small>
              Dont have an account ? sign up <Link to="/signup">here</Link>  
            </small>
        </form>
      </Grid>
      <Grid item sm>
        <ToastContainer />
        </Grid>
    </Grid>
  )
}
Forgot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Forgot