import React, {useState} from 'react'
import useStyles from './styles'
import {useHistory} from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { deletePost, likePost} from '../../../actions/posts';



const Post = ({post,setCurrentId}) => {

  //# post ==> {title:'', message: '', creatorId: '', name:"", tags: '', selectedFile: '', createdAt, tags:[], likeCount}

  
  const user = JSON.parse(localStorage.getItem('profile'));
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.user?.googleId || user?.user?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = () => {
        dispatch(likePost(post._id))
        //if a user has already liked the post, this will unlike it
        if(hasLikedPost){
            //filter out the user's like (where id === userId)
            //and filter in (keep) others likes
            setLikes(post.likes.filter((id) => id !== userId))
            //if a user has not already liked the post
        } else {
            setLikes([...post.likes, userId])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = (e) => history.push(`/posts/${post._id}`);

    return <>
        
          <Card className={classes.card} raised elevation={6}>
                
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            
           

            <div className={classes.overlay}>
                <Typography variant="h6"> {post.title} </Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
            </div>




            { user?.user?.googleId === post?.creatorId || user?.user?._id  === post?.creatorId && (
                     <div className={classes.overlay2}>
                     <Button style={{color:"white"}} size="small" onClick={()=> {setCurrentId(post._id)}}>
                         <MoreHorizIcon fontSize="default" />
                     </Button>
                 </div>
                )}
                
         <ButtonBase 
            component="span"
            name="test"
            className={classes.cardActions} 
            onClick={openPost}>
                

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                     {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <CardContent>
                <Typography variant="h6" color="textPrimary" className={classes.title} gutterBottom> 
                    {post.message} 
                </Typography>
                <Typography variant="body2"  color="textSecondary" className={classes.title} gutterBottom> 
                    by {post.name} 
                </Typography>
            </CardContent>

  
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary"  
                    disabled = {!user?.user}
                    onClick={handleLike}>
                     <Likes />
                </Button>

                { user?.user?.googleId === post?.creatorId || user?.user?._id  === post?.creatorId && (
                    <Button size="small" color="secondary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>

                )}
                
    


            </CardActions>

        </Card>
        


        
    </>
}

export default Post
