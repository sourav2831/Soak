import React, { useState, Fragment } from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import useStyles from '../../util/theme'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


function Comments(props) {
  const classes =useStyles()
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }
  return (
    <Fragment>
      <p style={{cursor:"pointer",color:"#4CAF50"}} onClick={handleClick}>View all comments</p>
      {
        open &&
        props.comments.map((comment) => {
          return(
          <Fragment key={comment.createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${comment.userName}`}
                        color="primary"
                      >
                        {comment.userName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(Number(comment.createdAt)).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{comment.comment}</Typography>
                    </div>
                  </Grid>
                </Grid>
          </Grid>
            </Fragment>
          )
        })
        
      }
    </Fragment>
  )
}

export default Comments