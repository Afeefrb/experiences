import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Container, Typography, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { signup, signin } from '../../actions/auth';


const Auth = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isWantToSignUp, setIsWantToSignUp ] = useState(false);
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const history = useHistory();

    const classes = useStyles();
    const dispatch = useDispatch();


    const handleShowPassword = () => {

       return setShowPassword((prevShowPassword) => !prevShowPassword)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isWantToSignUp) {
            dispatch(signup(formData,history));

        } else {
            dispatch(signin(formData,history));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})                                                                                                                       
    }

    const switchMode = () =>  {
     setIsWantToSignUp((prevIsSignup) => !prevIsSignup);
     setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        //# res: {profileObj:{name, email, imageUrl}}
        const user = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:"AUTH", data:{user, token} })  
            history.push("/");
        } catch (error) {
            console.log(error)
        }

    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Signin was not successful. Try again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isWantToSignUp? "Sign Up": "Sign In"} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                   <Grid container spacing={2}>   
                        {isWantToSignUp && (
                            <>

                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />

                                <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                            </>
                        )}

                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                           
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {isWantToSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                   </Grid>
                            
                    

                  <Button
                     type="submit"
                     variant="contained"
                     fullWidth
                     color="primary"
                     className={classes.submit}>
                        {isWantToSignUp? "Sign up" : "Sign in"}
                    </Button>


                    <GoogleLogin 
                        clientId="654296347327-pdphoog5bdr7ra7f1965mdfkm2vq00us.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                variant="contained"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                color="primary"
                                startIcon={<Icon />} >
                                
                                    Google Sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                 

                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                            {isWantToSignUp? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>


                </form>
            </Paper>
        </Container>
    )
}

export default Auth
