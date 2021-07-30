import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'
import {Grid, CircularProgress} from '@material-ui/core'



const Posts = ({setCurrentId}) => {

    const classes = useStyles();
    
    const {isLoading,posts} = useSelector(state => state?.posts); 

    //# state = [ [posts], currentPage, numberOfPages]
    //# post ==> {title:'', message: '', creator: '', tags: '', selectedFile: '', createdAt, tags:[], likeCount}


    if(!posts?.length && !isLoading) return 'No experiences found.'

    return (
        
       <>
        {isLoading ? (<CircularProgress size="10em" />) : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                        
                    </Grid>
                ))}
            </Grid>
        )}
        </>
    )
}

export default Posts
