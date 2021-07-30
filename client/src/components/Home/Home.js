import React, {useState, useEffect} from 'react';

import {Container, Grow, Grid, Paper, AppBar, TextField, Button, CardMedia} from '@material-ui/core';

import ChipInput from 'material-ui-chip-input';

import {useHistory, useLocation} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux';

import {getPosts, getPostsBySearch} from '../../actions/posts'

import Form from '../Form/Form.js'
import Posts from '../Posts/Posts.js'
import Pagination from '../Pagination'

import useStyles from './styles' 



function useQuery (){
    return new URLSearchParams(useLocation().search)
}
//http://localhost:3000/posts?page=1


const Home = () => {
    const [currentId, setCurrentId] = useState(null); 
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;
    //http://localhost:3000/posts?page=1
    const searchQuery = query.get('searchQuery');




    const searchPost = () => {
        if(search.trim() || tags) {

            dispatch(getPostsBySearch({search, tags: tags.join(",")}))
            //cant pass a [tags] array through URL parameters, needs to be a string with ',' comma
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
        } else {
            history.push("/")
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAddTag = (tag) => setTags([...tags, tag]);

    const handleDeleteTag = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

    

    return <>
        <Grow in>
                <Container maxWidth="xl">
                    <Grid  className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                        
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                name="search"
                                label="Search Memories" 
                                variant="outlined" fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e)=>{setSearch(e.target.value)}}
                                />
                          
                            <ChipInput 
                                label="Search Tags"
                                value={tags}
                                style={{margin: "10px 0"}}
                                onAdd={handleAddTag}
                                onDelete={handleDeleteTag}
                                variant="outlined"

                            />

                            <Button onClick={searchPost} color="primary" className={classes.searchButton} variant="contained">Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}  />

                            {(!searchQuery && !tags.length) && (
                                <Paper elevation={6}>
                                <Pagination page={page} className={classes.pagination} />
                            </Paper>
                            )}

                            
                        </Grid>
               
                     </Grid>
                </Container>

                
               
            </Grow>

         
    </>
}

export default Home
