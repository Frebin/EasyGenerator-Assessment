import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomTextField from 'src/components/CustomTextField/CustomTextField'
import CustomButton from 'src/components/CustomButton/CustomButton'
import Loader from 'src/components/Loader/Loader'
import { startLogin, checkAuthState, resetErrorStateStart } from 'src/store/actionCreators/Login.action.Creators'
import { RootState, AppDispatch } from 'src/store/store'
import { showSnackBar } from 'src/store/actionCreators/Snackbar.action.Creators'
import { emailRegEx } from 'src/constants/common'
import classes from 'src/assets/css/Login.module.css'
import { BrandLogoMain, LoginSideImage } from 'src/constants/images'
import SideImage from 'src/components/SideImage/SideImage'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  })
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const authState: string | null = useSelector(
    (state: RootState) => state.loginReducer.token
  )
  const errorState: any | null = useSelector(
    (state: RootState) => state.loginReducer.error
  )
  const loadingState: boolean | null = useSelector(
    (state: RootState) => state.loginReducer.loading
  )
  useEffect(() => {
    dispatch(checkAuthState())
    if (authState) {
      navigate('/home')
    }
  }, [authState])
  useEffect(() => {
    if (errorState) {
      dispatch(showSnackBar('error', errorState))
    }
    return () => {
      dispatch(resetErrorStateStart())
    }
  }, [errorState])

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword)
  const validationFn = () => {
    let emailError = ''
    let passwordError = ''
    if (!emailRegEx.test(email.trim())) {
      emailError = 'Please enter valid email id'
    }
    if (!email.trim()) {
      emailError = 'This field can not be empty'
    }
    if (!password) {
      passwordError = 'This field can not be empty'
    }

    return {
      emailError,
      passwordError
    }
  }
  const handleMouseLogin = (event: React.MouseEvent) => {
    handleLogin()
  }
  const handleKeyLogin = (event: React.KeyboardEvent) => {
    if (event.key && event.key === 'Enter') {
      handleLogin()
    } else {
      return
    }
  }
  const handleLogin = () => {
    const valData = validationFn()
    const isEmpty = Object.values(valData).every((x) => x === null || x === '')
    if (!isEmpty) {
      setErrorMessage({
        email: valData.emailError,
        password: valData.passwordError
      })
    } else {
      setErrorMessage({
        email: '',
        password: ''
      })
      const payload = {
        email: email,
        password: password,
      }
      dispatch(startLogin(payload))
    }
  }
  return (
    <Box sx={{ m: 3, marginTop: { xs: '0rem', md: '4rem', lg: '1rem', xl: '6rem' } }}>
      <Grid container className='pageContainerStyle'>
        <Grid item xs={12} md={6} lg={7} xl={7}>
          <SideImage image_url={LoginSideImage} />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          xl={3.5}
          className={classes.loginCard}
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
              alt="EduHealth"
              src={BrandLogoMain}
            />
            <Typography
              component="h5"
              variant="body1"
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                color: '#5E5873',
              }}
            >
              Welcome to Easy Generator portal
            </Typography>
            <Typography
              component="h2"
              variant="caption"
              sx={{ alignSelf: 'flex-start', marginBottom: '0.5rem', color: '#6E6B7B' }}
            >
              Please sign-in to your account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <CustomTextField
                textFieldId="email"
                textFieldLabel={'Email'}
                placeHolder='email@address.com'
                errorMessage={errorMessage.email}
                textFieldValue={email}
                showPrimary={true}
                handleChange={handleEmailChange}
                handleKeyUp={handleKeyLogin}
              />
              <CustomTextField
                textFieldId="password"
                textFieldLabel={'password'}
                textFieldType="password"
                placeHolder='********'
                errorMessage={errorMessage.password}
                endIcon={true}
                textFieldValue={password}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                showPrimary={true}
                handleChange={handlePasswordChange}
                handleKeyUp={handleKeyLogin}
              />
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '-0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <Grid item sx={{ marginTop: '0.5rem' }}>
                  <NavLink to="/forgot-password" className="navLinkCustomStyle">
                    Forgot password
                  </NavLink>
                </Grid>
              </Grid>
              <CustomButton
                buttonText={
                  loadingState ? (
                    <Loader size={20} color="primary.main" />
                  ) : (
                    'Login'
                  )
                }
                backgroundColor="primary.main"
                color="secondary.main"
                boxShadow="none"
                buttonTextAlign="center"
                buttonDisabled={loadingState}
                handleClick={(event) => handleMouseLogin(event)}
              />
              <Grid container>
                <Grid item sx={{ marginTop: '0.02rem' }}>
                  <Typography variant="caption">
                    Don't have an account
                  </Typography>
                </Grid>
                <Grid item sx={{ marginLeft: '0.3rem' }}>
                  <NavLink to="/signup" style={{ fontSize: '0.75rem' }} className="navLinkCustomStyle">
                    Sign-Up
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
