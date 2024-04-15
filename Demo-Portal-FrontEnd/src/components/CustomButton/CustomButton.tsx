import React from 'react';
import { Button, SxProps, Theme } from '@mui/material'

interface CustomButtonProps {
    buttonText: any
    boxShadow?: string
    fullWidth?: boolean
    color: string
    backgroundColor: string
    buttonTextAlign?: string
    startIcon?: any
    showIcon?: boolean
    buttonDisabled?: boolean
    smallButton?: boolean
    showElevation?: boolean
    type?: 'submit' | 'reset'
    sx?: SxProps<Theme>
    handleClick?: React.MouseEventHandler
}

export default function CustomButton({
    buttonText,
    boxShadow,
    fullWidth,
    color,
    backgroundColor,
    buttonTextAlign,
    startIcon,
    showIcon,
    buttonDisabled,
    smallButton,
    showElevation,
    type,
    sx,
    handleClick,
}: CustomButtonProps) {
    return (
        <Button
            fullWidth={fullWidth ? true : false}
            variant='contained'
            type={type ? type : 'button'}
            startIcon={showIcon ? startIcon : ''}
            sx={{
                mt: 1.5,
                mb: 1.5,
                textTransform: 'none',
                fontSize: '0.7rem',
                padding: smallButton ? '0.2rem 0rem' : '0.5rem 0.5rem',
                marginTop: '0.7rem',
                boxShadow: boxShadow,
                backgroundColor: backgroundColor,
                color: color,
                justifyContent: buttonTextAlign,
                '&.MuiButtonBase-root:hover': {
                    bgcolor: backgroundColor,
                    boxShadow: showElevation ? '1px 1px 6px 1px rgba(216,214,222,0.4)' : 'none'
                },
                ...sx
            }}
            disabled={buttonDisabled}
            onClick={handleClick}
        >
            {buttonText}
        </Button>
    )
}
