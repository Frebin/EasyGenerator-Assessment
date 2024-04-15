import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import styles from 'src/assets/css/app.module.css'
import { theme } from 'src/configs/Theme.config'
import RouteImports from './RouteImports'
import { RootState, AppDispatch } from 'src/store/store'
import { checkAuthState } from 'src/store/actionCreators/Login.action.Creators'
import CustomSnackBar from 'src/components/CustomSnackBar/CustomSnackBar'
import { hideSnackBar } from 'src/store/actionCreators/Snackbar.action.Creators'
import { Severity } from 'src/interfaces/Common.interfaces'

function App() {
  const dispatch: AppDispatch = useDispatch()

  const authState: string | null = useSelector(
    (state: RootState) => state.loginReducer.token
  )

  const toasterOpen: boolean | null = useSelector(
    (state: RootState) => state.snackbarReducer.toasterOpen
  )

  const messageType: Severity | null = useSelector(
    (state: RootState) => state.snackbarReducer.messageType
  )

  const message: string | null = useSelector(
    (state: RootState) => state.snackbarReducer.message
  )
  useEffect(() => {
    dispatch(checkAuthState())
    if (authState) {

    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <CustomSnackBar
          open={toasterOpen}
          message={message}
          type={messageType}
          handleClose={() => dispatch(hideSnackBar())}
        />
        <CssBaseline />
        <RouteImports />
      </div>
    </ThemeProvider>
  )
}

export default App
