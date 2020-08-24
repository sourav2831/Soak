import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import useStyles from "../util/theme"

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const PostSkeleton = (props) => {
  const classes = useStyles()
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card2} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default PostSkeleton;