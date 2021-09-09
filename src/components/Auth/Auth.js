import React,{useState} from 'react';
import { Avatar, Container, Paper, Button, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import UseStyles from './styles';
import Input  from './Input';
import Icon from './Icon';
import {signin, signup} from './../../action/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {

    const classes = UseStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            console.log(formData);
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half   />
                                </>
                            )}
                            <Input name="email" label="Email" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  />
                            {isSignUp && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />)}
                    </Grid>
                    <Button className={classes.submit} fullWidth type="submit" variant="contained" color="primary">
                        {isSignUp ? 'Sign up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId={process.env.AUTH_ID}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item >
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Dont't have a account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;