import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Typography, TextField, Button} from '@material-ui/core'
import useStyles from './styles'
import {createComment} from '../../actions/posts'

const CommentSection = ({post}) => {
    //# post => {title, message, name,...etc}

    const commentsRef = useRef();
    
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user?.user?.name} : ${comment}`;
        const newComments = await dispatch(createComment(finalComment, post._id));
        setComments(newComments);
        setComment('');
        
        commentsRef.current.scrollIntoView({ block: "center", behavior: 'smooth' });

    }

  
    
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
            {user?.user?.name && (
                     <div style={{width:'70%'}}>
                        <Typography gutterBottom variant="h5"> Write a Comment</Typography>
                        <TextField  
                            label='Comment'
                            fullWidth
                            variant='outlined'
                            rows={4}
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                                style={{marginTop:'10px'}}
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!comment}
                                onClick={handleClick}
                                    >
                                Comment
                            </Button>
                </div>
                )}
                     
                <div className={classes.commentsInnerContainer}>
             
                    <Typography gutterBottom variant="h6"> Comments </Typography>
                    {comments.map((c,i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                              
                          <div ref={commentsRef}>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                                
                            </div>
                          
                        </Typography> 
                    ))}
                    
                </div>
               
            </div>
           
        </div>
    )
}

export default CommentSection
