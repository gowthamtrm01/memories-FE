import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles'
import { createPost, updatePost } from '../../action/posts';

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [postData, setPostsData] = useState({title: '', message: '', tag: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            setPostsData(post);
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostsData({  title: '', message: '', tag: '', selectedFile: '' });
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                     Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => handleSubmit(e)}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostsData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostsData({ ...postData, message: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag (coma sparated)" fullWidth value={postData.tag} onChange={(e) => setPostsData({ ...postData, tag: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostsData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type="submit">Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={() => clear()}>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;