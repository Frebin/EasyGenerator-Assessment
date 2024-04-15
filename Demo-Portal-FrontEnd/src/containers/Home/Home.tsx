import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { checkAuthState } from 'src/store/actionCreators/Login.action.Creators';

export default function Home() {
    const [userName, setUserName] = useState(null);
    const dispatch: AppDispatch = useDispatch();

    const userState: any = useSelector((state: RootState) => state.loginReducer.user);
    useEffect(() => {
        if (userState) {
            setUserName(userState?.name || null)
        }
    }, [userState])

    useEffect(() => {
        dispatch(checkAuthState());
    }, [])

    return (
        <Box sx={{ m: 3, textAlign: 'center', backgroundColor: '#f0f0f0', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Hi {userName},</Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>Welcome to the application.</Typography>
                </Grid>

            </Grid>
        </Box>

    )
}
