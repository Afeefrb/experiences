import React, {useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core'

import useStyles from './styles'

import FileBase from 'react-file-base64'

import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from  '../../actions/posts.js'
import {useHistory} from 'react-router-dom';

const Form = ({currentId, setCurrentId}) => {
    
    const [postData, setPostData] = useState({
        title:'',
        message: '',
        name: '',
        tags: '',
        selectedFile: ''
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId): null);

    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.user?.name}))
        } else {
            
            dispatch(createPost({...postData, name: user?.user?.name}, history))
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({   title:'',
        message: '',
        name: '',
        tags: '',
        selectedFile: ''})
    }

    if (!user?.user?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own experiences and like other's experience.
            </Typography> 
          </Paper>
        );
      }


    return (
        <Paper className={classes.paper} elevation={6}>
           <form
              noValidate
              autoComplete="off"
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}>

                <Typography variant="h6">{currentId? "Edit ":"Create "} an experience </Typography>
                <TextField name="title" label="Title" variant="outlined" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
                <TextField name="message" label="Message" variant="outlined" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
                {/* <TextField name="name" label="Name" variant="outlined" fullWidth value={postData.name} onChange={(e) => setPostData({...postData, name: e.target.value})} /> */}
                <TextField name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(",")})} />

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
                </div>
                
                <Button
                  className={classes.buttonSubmit}
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit">Submit</Button>

                
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={clear}>Clear</Button>

            </form>

        </Paper>
    )
}

export default Form

