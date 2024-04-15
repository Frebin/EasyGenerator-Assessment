import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Button, IconButton, Menu, MenuItem, Container, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { BrandLogoMain } from 'src/constants/images'
import UserProfile from './UserProfile'

const Header: React.FC = () => {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                height: '3.5rem',
                backgroundColor: 'background.default',
            }}
        >
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{ justifyContent: { xs: 'space-between' } }}>
                    <Grid>
                        <NavLink to='/home'>
                            <Box
                                component={'img'}
                                sx={{
                                    height: 25,
                                    cursor: 'pointer'
                                }}
                                alt={'Easy Generator logo'}
                                src={BrandLogoMain}
                            />
                        </NavLink>
                    </Grid>
                    <UserProfile />
                </Toolbar>
            </Container>

        </AppBar >
    );
}

export default Header;
