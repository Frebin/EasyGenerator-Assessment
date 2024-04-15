import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person, LockPersonRounded, LogoutRounded } from '@mui/icons-material'
// import { PersonDefaultImage } from 'src/constants/images';
import { logoutStart, checkAuthState } from 'src/store/actionCreators/Login.action.Creators';
import { RootState, AppDispatch } from '../../store/store';
import { AccountCircle } from '@mui/icons-material';

export default function UserProfile() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const userState: any = useSelector((state: RootState) => state.loginReducer.user);

    const profileSettings = [
        { label: 'Profile', link: `/profile/${userState.id}`, icon: <Person /> },
        {
            label: 'Change Password',
            link: '/change-password',
            icon: <LockPersonRounded />,
        },
        { label: 'Logout', link: '/logout', icon: <LogoutRounded /> },
    ]

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event: any, path?: string | null) => {
        setAnchorElUser(null);
        if (path) {
            if (path === '/logout') {
                dispatch(logoutStart());
                dispatch(checkAuthState());
            } else {
                navigate(path);
            }
        }
    };

    return (
        <Box
            sx={{
                flexGrow: 0,
            }}
        >
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                sx={{ ml: 2 }}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                sx={{
                    mx: { md: -1 },
                    my: 5,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={(event: any) => handleCloseUserMenu(event, null)}
            >
                {profileSettings.map((profileSetting) => (
                    <MenuItem
                        key={profileSetting.label}
                        onClick={(event: React.MouseEvent) =>
                            handleCloseUserMenu(event, profileSetting.link)
                        }
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px', // Adjust the gap between icon and text
                            padding: '8px 16px', // Adjust the padding
                        }}
                    >
                        <Typography
                            variant="body2"
                            textAlign="center"
                            fontSize="0.75rem"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '500',
                                padding:'5px',
                                
                            }}
                        >
                            {profileSetting.icon}
                            {profileSetting.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}