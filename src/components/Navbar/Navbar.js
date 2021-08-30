import React,{useState, useEffect} from 'react';
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../images/memories.jpg';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodeToken = decode(token);

            if(decodeToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="50"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" color="primary" variant="contained" >Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;