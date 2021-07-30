import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Avatar,Button, Toolbar} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png'
import {Link} from 'react-router-dom'
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'

const NavBar = () => {

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //# user: {user:{name, email}, token}

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
       
    }, [location])

    const handleLogout = () => {

        dispatch({type:"LOGOUT"});
        history.push("/");
        setUser(null);

    }


    return (    
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Experiences</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60px" width="60px" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.user?.name} src={user?.user?.imageUrl}> {user?.user?.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user?.user?.name} </Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>

                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>

                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
