import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from 'react-router-dom';
import axios from "axios"
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import useStyles from "../util/theme"

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function Signup(props) {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
          fName: '',
          lName:'',
          email: '',
          password: '',
          userName:'',
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
      fName: credentials.fName,
      lName: credentials.lName,
      userName: credentials.userName,
      email: credentials.email,
      password: credentials.password,
    };
    axios.post("/api/user/signup", userData)
      .then((res) => {
        setCredentials((prevCredentials) => {
          return {
            fName: '',
            lName:'',
            email: '',
            password: '',
            userName:'',
            loading: false,
            errors: {}
          }
        })
        toast.success(res.data.message);
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
        <img src={AppIcon} alt="Soak Icon" className={classes.image2} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="fName"
              name="fName"
              type="text"
              label="First Name"
              className={classes.textField}
              helperText={JSON.stringify(errors) === '{}'?errors.error:errors.error.fName}
              error={JSON.stringify(errors) === '{}'?false:errors.error.fName ? true : false}
              value={credentials.fName}
              onChange={handleChange}
              fullWidth
          />
            <TextField
              id="lName"
              name="lName"
              type="text"
              label="Last Name"
              className={classes.textField}
              helperText={JSON.stringify(errors) === '{}'?errors.error:errors.error.lName}
              error={JSON.stringify(errors) === '{}'?false:errors.error.lName ? true : false}
              value={credentials.lName}
              onChange={handleChange}
              fullWidth
          />
            <TextField
              id="userName"
              name="userName"
              type="text"
              label="User Name"
              className={classes.textField}
              helperText={JSON.stringify(errors) === '{}'?errors.error:errors.error.userName}
              error={JSON.stringify(errors) === '{}'?false:errors.error.userName ? true : false}
              value={credentials.userName}
              onChange={handleChange}
              fullWidth
          />
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
            Signup
            {loading && (
                <CircularProgress size={30} className={classes.progress} />
            )}
            </Button>
          <br/>
            <small>
            Already have an account ? Login <Link to="/login">here</Link>
            </small>
        </form>
      </Grid>
      <Grid item sm  >
        <ToastContainer />
        </Grid>
    </Grid>
  )
} 
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Signup