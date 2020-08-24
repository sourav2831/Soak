import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import useStyles from "../util/theme"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate } from "../util/AuthCheck";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


function Login(props) {
  const classes = useStyles();
  const [credentials,setCredentials]=useState({
          email: '',
          password: '',
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
      password: credentials.password
    };
    axios.post("/api/user/signin", userData)
      .then((res) => {
        authenticate(res, () => {
          setCredentials({
            ...credentials,
            email: '',
            password: '',
            loading: false,
            errors: {}
          });
        });
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err.response.data)
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
        <img src={AppIcon} alt="Soak Icon" className={classes.image2} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={JSON.stringify(errors) === '{}'?errors.error:errors.error.password}
              error={JSON.stringify(errors) === '{}'?false:errors.error.password ? true : false}
              value={credentials.password}
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
            Login
            {loading && (
                <CircularProgress size={30} className={classes.progress} />
            )}
            </Button>
          <br/>
            <small>
              Dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
          <br />
          <br/>
            <small>
              Forgot password ? reset password <Link to="/forgot">here</Link>
            </small>
        </form>
      </Grid>
      <Grid item sm>
        <ToastContainer />
        </Grid>
    </Grid>
  )
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Login