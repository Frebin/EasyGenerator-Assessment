import { snackBarStart, snackBarset } from 'src/store/reducers/Snackbar.reducer'
import { AppDispatch } from 'src/store/store'
import { Severity } from 'src/interfaces/Common.interfaces'

export const showSnackBar = (messageType: Severity, message: string) => async (dispatch: AppDispatch) => {
    dispatch(snackBarStart())
    dispatch(snackBarset({ toasterOpen: true, messageType: messageType, message: message }))
}
export const hideSnackBar = () => async (dispatch: AppDispatch) => {
    dispatch(snackBarset({ toasterOpen: false }))
}