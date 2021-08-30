import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Form from '../Form/Form';
import Posts from '../posts/posts';
import { getPosts } from '../../action/posts';

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid container justfiy="space-between" alignitems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;