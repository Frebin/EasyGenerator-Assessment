import { Grid, Box, Typography } from '@mui/material'

export default function UnexpectedError() {
    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '10rem'
            }}
        >
            <Typography>Internal Server Error !</Typography>
            <Typography>Please contact system administrator...</Typography>

        </Grid>
    )
}