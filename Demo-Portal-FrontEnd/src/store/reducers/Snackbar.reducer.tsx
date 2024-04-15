import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Severity } from 'src/interfaces/Common.interfaces'

interface SnackbarState {
    toasterOpen: boolean,
    messageType: Severity,
    message: string
}

const initialState: SnackbarState = {
    toasterOpen: false,
    messageType: 'success',
    message: ''
}

const SnackbarSlice = createSlice({
    name: 'snackBarReducer',
    initialState,
    reducers: {
        snackBarStart: (state) => {
            return {
                ...state,
                toasterOpen: false,
                messageType: 'success',
                message: ''
            }
        },
        snackBarset: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                toasterOpen: action.payload.toasterOpen,
                messageType: action.payload?.messageType,
                message: action.payload?.message,

            }
        }
    }
})

export const { snackBarStart, snackBarset } = SnackbarSlice.actions

export default SnackbarSlice.reducer