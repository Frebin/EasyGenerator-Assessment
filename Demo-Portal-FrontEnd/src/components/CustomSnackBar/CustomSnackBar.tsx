import * as React from 'react';
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Severity } from 'src/interfaces/Common.interfaces'

export interface CustomSnackbarProps {
    open: boolean,
    type: Severity,
    message: string,
    handleClose?: any
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function CustomSnackbar({ open, type, message, handleClose }: CustomSnackbarProps) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            <Alert
                onClose={handleClose}
                severity={type}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
