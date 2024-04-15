import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Paper, Box, Grid, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _post } from 'src/configs/Api.config';
import { signUpUrl } from 'src/constants/Routes';
import classes from 'src/assets/css/SignUp.module.css';
import { SignUpSideImage, BrandLogoMain } from 'src/constants/images';
import SideImage from 'src/components/SideImage/SideImage';
import CustomButton from 'src/components/CustomButton/CustomButton';
import CustomTextField from 'src/components/CustomTextField/CustomTextField';
import Loader from 'src/components/Loader/Loader';
import { AppDispatch } from 'src/store/store';
import { showSnackBar } from 'src/store/actionCreators/Snackbar.action.Creators';
import { emailRegEx } from 'src/constants/common';


interface SignUpPayload {
    name: string;
    email: string;
    password: string;
    roleName: string;
    isNewUser: boolean;
    lastLoggedIn: string;
}

interface userError {
    userName: string,
    email: string,
    tncAgree: string,
    password: string,
    confirmPassword: string
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        userName: '',
        email: '',
        tncAgree: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();


    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const capitalizedValue = inputValue
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        setUserName(capitalizedValue);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const passwordError = handlePasswordValidation(newPassword)
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            password: passwordError
        }));
    }

    const handlePasswordValidation = (newPassword: string) => {
        // Perform password validation
        let passwordError = ''

        if (newPassword.length < 8) {
            passwordError = 'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.'
        } else if (/[a-zA-Z]/.test(newPassword) == false) {
            // Contains at least 1 letter
            passwordError = 'Password must be contain at least 1 letter.'
        } else if (/\d/.test(newPassword) == false) {
            // Contains at least 1 number
            passwordError = 'Password must be contain at least 1 number.'
        } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword) == false) {
            // Contains at least 1 special character
            passwordError = 'Password must be contain at least 1 special character.'
        }
        return passwordError

    }

    const handleConfirmPasswordValidation = (newPassword: string) => {
        // Check if confirm password matches password
        let confirmPasswordError = ''
        if (newPassword !== password) {
            confirmPasswordError = 'Passwords do not match.'
        }
        return confirmPasswordError
    }
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);

        const confirmPasswordError = handleConfirmPasswordValidation(newConfirmPassword)
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            confirmPassword: confirmPasswordError
        }));
    }

    const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemember(event.target.checked);
    }

    const resetForm = () => {
        setEmail('');
        setUserName('');
        setPassword('')
        setConfirmPassword('')
    }

    const validationFn = () => {
        let nameError = '';
        let emailError = '';
        let tncAgreeError = '';

        if (!userName) {
            nameError = `This field can not be empty`;
        }
        if (!emailRegEx.test(email.trim())) {
            emailError = 'Please enter valid email id';
        }
        if (!email.trim()) {
            emailError = `This field can not be empty`;
        }
        if (!remember) {
            tncAgreeError = `This field can not be unchecked`;
        }
        const passwordError = handlePasswordValidation(password)
        const confirmPasswordError = handlePasswordValidation(confirmPassword)

        return {
            nameError,
            emailError,
            tncAgreeError,
            passwordError,
            confirmPasswordError
        };
    };

    const handleSignup = async (event: React.MouseEvent) => {
        const valData = validationFn();
        const isEmpty = Object.values(valData).every((x) => x === null || x === '');
        if (!isEmpty) {
            setErrorMessage({
                userName: valData.nameError,
                email: valData.emailError,
                password: valData.passwordError,
                confirmPassword: valData.confirmPasswordError,
                tncAgree: valData.tncAgreeError
            });
        } else {
            setErrorMessage({
                userName: '',
                email: '',
                tncAgree: '',
                password: '',
                confirmPassword: ''
            });
            const payload: SignUpPayload = {
                name: userName,
                email: email,
                password: password,
                roleName: 'User',
                isNewUser: true,
                lastLoggedIn: new Date().toISOString()
            }
            try {
                setLoading(true);
                const response = await _post(signUpUrl, payload);
                if (!response?.data?.user || response?.data?.user === undefined) {
                    const errorMessage = response?.data?.message || 'Something wrong happened, please try again later!'
                    dispatch(showSnackBar('error', errorMessage));
                }
                if (response?.data?.user) {
                    resetForm();
                    dispatch(showSnackBar('success', response?.data?.message));
                    const userObj = {
                        id: response.data.user._id,
                        email: response.data.user.email,
                        name: response.data.user.name,
                        isNewUser: response.data.user.isNewUser,
                        roleName: response.data.user.roleName
                    }
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(userObj))
                    navigate('/home');
                }
                setLoading(false);
            } catch (err: any) {
                setLoading(false);
                dispatch(showSnackBar('error', err.response.data.message));
            }
        }
    };

    const handleGoogleLogin = (event: React.MouseEvent) => {
        // 
    };
    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword)
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((showPassword) => !showPassword)

    return (
        <Box sx={{ m: 3, marginTop: { xs: '0rem', md: '1rem', lg: '1rem', xl: '6rem' } }}>
            <Grid container className='pageContainerStyle'>
                <Grid item xs={12} md={6} lg={7} xl={7}>
                    <SideImage image_url={SignUpSideImage} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5}
                    lg={4}
                    xl={3.5}
                    className={classes.signupCard}
                >
                    <Grid
                        sx={{
                            my: 3,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 30,
                                alignSelf: 'flex-start',
                                marginBottom: '1rem',
                            }}
                            alt="Easy Generator"
                            src={BrandLogoMain}
                        />
                        <Typography
                            component="h2"
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                alignSelf: 'flex-start',
                                color: 'primary.main',
                            }}
                        >
                            Welcome to Easy Generator portal
                        </Typography>
                        <Typography
                            component="h5"
                            variant="caption"
                            sx={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
                        >
                            Register as a new user
                        </Typography>
                        <Box component="form" noValidate>
                            <CustomTextField
                                textFieldId="userName"
                                textFieldLabel={'Name'}
                                placeHolder={'Name'}
                                textFieldValue={userName}
                                errorMessage={errorMessage.userName}
                                showPrimary={true}
                                handleChange={handleUserNameChange}
                            />
                            <CustomTextField
                                textFieldId="email"
                                textFieldLabel={'Email'}
                                placeHolder="email@address.com"
                                textFieldValue={email}
                                errorMessage={errorMessage.email}
                                showPrimary={true}
                                handleChange={handleEmailChange}
                            />
                            <CustomTextField
                                textFieldId="password"
                                textFieldLabel={'Password'}
                                textFieldType="password"
                                placeHolder='********'
                                errorMessage={errorMessage.password}
                                endIcon={true}
                                textFieldValue={password}
                                showPassword={showPassword}
                                handleClickShowPassword={handleClickShowPassword}
                                showPrimary={true}
                                handleChange={handlePasswordChange}
                            />
                            <CustomTextField
                                textFieldId="confirmPassword"
                                textFieldLabel={'Confirm Password'}
                                textFieldType="password"
                                placeHolder='********'
                                errorMessage={errorMessage.confirmPassword}
                                endIcon={true}
                                textFieldValue={confirmPassword}
                                showPassword={showConfirmPassword}
                                handleClickShowPassword={handleClickShowConfirmPassword}
                                showPrimary={true}
                                handleChange={handleConfirmPasswordChange}
                            />
                            <Grid container>
                                <Grid item sx={{ margin: '-0.5rem 0rem', display: "flex" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={remember}
                                                size="small"
                                                onChange={handleRememberChange}
                                                sx={{ color: 'secondary.contrastText' }}
                                            />
                                        }
                                        label=""
                                        sx={{ color: 'primary.main', marginTop: '0.1rem', mr: "0rem" }}
                                    />
                                    <Grid sx={{ marginTop: '0.6rem', mr: '0.5rem' }}>
                                        <Typography component="h2" variant="caption" sx={{ color: "rgba(0, 0, 0, 0.87)", cursor: "initial" }}>
                                            {'I Agree to'}
                                        </Typography>
                                    </Grid>
                                    <Grid sx={{ marginTop: '0.4rem' }}>
                                        <NavLink
                                            to="#"
                                            className="navLinkCustomStyle" style={{ fontSize: "0.75rem" }}>
                                            {'Privacy policy & terms'}
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {errorMessage.tncAgree ? (
                                <Typography component="h5" variant="caption" sx={{ fontSize: '0.7rem', color: 'red' }}>
                                    {errorMessage.tncAgree}
                                </Typography>
                            ) : null}
                            <CustomButton
                                buttonText={
                                    loading ? <Loader size={20} color="primary.main" /> : 'Sign Up'
                                }
                                backgroundColor="primary.main"
                                color="secondary.main"
                                boxShadow="none"
                                buttonTextAlign="center"
                                buttonDisabled={loading}
                                handleClick={(event) => handleSignup(event)}
                            />
                            <Grid container>
                                <Grid item>
                                    <Typography variant="caption" sx={{ marginTop: '1rem' }}>
                                        {'Already have an account?'}
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ marginLeft: '0.3rem' }}>
                                    <NavLink to="/signin" className="navLinkCustomStyle">
                                        {'Sign-In instead'}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}