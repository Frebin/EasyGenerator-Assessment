import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FF8E1E',
            light: '#FFB66F',
            dark: '#000000'
        },
        secondary: {
            main: '#F8F8F8',
            contrastText: '#D8D6DE'
        },
        background: {
            default: '#F8F8F8',
        }
    },
    typography: {
        fontFamily: ['Poppins', 'sans-serif'].join(',')
    }
})