import React from 'react'
import { Grid, Box, Typography, useMediaQuery } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'

export default function NotFound() {
    const screenWidth = useMediaQuery('(min-width:1920px)')
    const authState: string | null = useSelector(
        (state: RootState) => state.loginReducer.token
    )
    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: screenWidth ? '15rem' : '10rem'
            }}
        >
            <Typography variant='h4'>OOPS...</Typography>
            <Typography variant='subtitle1'>PAGE NOT FOUND</Typography>
            {
                authState ?
                    <NavLink to='/home' className={'navLinkCustomStyle'}>
                        <Typography variant='subtitle1'>Back to home</Typography>
                    </NavLink> :
                    <NavLink to='/signin' className={'navLinkCustomStyle'}>
                        <Typography variant='subtitle1'>Back to login</Typography>
                    </NavLink>
            }
        </Grid>
    )
}
