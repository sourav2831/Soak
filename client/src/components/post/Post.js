import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../util/MyButton';
import useStyles from "../../util/theme"
import LikeButton from './LikeButton';
import DeletePost from './DeletePost';
import Comments from './Comments'
import CommentForm from './CommentForm'
 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';


function Post(props) {
  dayjs.extend(relativeTime);
  const classes = useStyles();
  const { comments, createdAt, imageName, userName, _id, comment, like, caption } = props.post
  const deleteButton =
  props.userName === userName ? (
    <DeletePost postId={_id} userName={userName} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia 
        image={`/api/user/image/${imageName}`}
        title="Post image"
        className={classes.imagePost}
      />
      <CardContent className={classes.content}>
      <Typography
            variant="h5"
            component={Link}
            to={`/users/${userName}`}
            color="primary"
        >
          {userName}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">{dayjs(Number(createdAt)).fromNow()}</Typography>
        <Typography variant="body1">{caption}</Typography>
        <LikeButton postId={_id} like={like} />
          <MyButton tip="comments" >
            <ChatIcon color="primary" />
          </MyButton>
        <span>{comment} Comments</span>
        <Comments comments={comments} />
        <CommentForm userName={props.userName} postId={_id} />
      </CardContent>
    </Card>
  )
}

export default Post