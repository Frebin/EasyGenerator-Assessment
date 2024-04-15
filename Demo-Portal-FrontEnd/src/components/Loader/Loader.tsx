import React from 'rect'
import { CircularProgress } from '@mui/material'

interface LoaderProps {
    size?: number
    color?: string
}

export default function Loader({ size, color }: LoaderProps) {
    return (
        <CircularProgress
            size={size ? size : 20}
            sx={{ color: color ? color : 'secondary.main' }}
        />
    )
}