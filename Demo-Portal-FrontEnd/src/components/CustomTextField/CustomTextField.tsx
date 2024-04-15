import React, { RefObject } from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import classes from 'src/assets/css/CustomTextField.module.css';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface CustomTextFieldProps {
  textFieldId: string;
  textFieldType?: string;
  textFieldLabel: string;
  textFieldValue?: string;
  showPrimary?: boolean;
  errorMessage?: string;
  endIcon?: boolean;
  showPassword?: boolean;
  filedDisabled?: boolean;
  required?: boolean;
  placeHolder?: string;
  isNumber?: boolean;
  maxLenghth?: number;
  errorTextColor?: boolean;
  ref?: RefObject<HTMLInputElement>;
  handleChange?: React.ChangeEventHandler;
  handleKeyUp?: React.KeyboardEventHandler;
  handleClickShowPassword?: React.MouseEventHandler;
}

export default function CustomTextField({
  textFieldId,
  textFieldLabel,
  textFieldValue,
  errorMessage,
  showPrimary,
  endIcon,
  showPassword = true,
  filedDisabled,
  required,
  placeHolder,
  isNumber,
  maxLenghth,
  errorTextColor,
  ref,
  handleChange,
  handleKeyUp,
  handleClickShowPassword,
}: CustomTextFieldProps) {
  let labelClass;
  let IconClass;
  showPrimary
    ? (labelClass = [classes.labelStyle, classes.primary].join(' '))
    : (labelClass = [classes.labelStyle, classes.black].join(' '));
  endIcon
    ? (IconClass = classes.blockDisplay)
    : (IconClass = classes.removeDisplay);

  return (
    <>
      {
        <Typography component="div" variant="caption" className={labelClass}>
          {textFieldLabel}{required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      }
      <TextField
        ref={ref}
        margin="normal"
        size="small"
        type={isNumber ? "number" : (showPassword ? 'text' : 'password')}
        fullWidth
        id={textFieldId}
        helperText={errorMessage}
        value={textFieldValue}
        placeholder={placeHolder}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        autoComplete="off"
        disabled={filedDisabled}
        sx={{
          '.MuiFormHelperText-root': { fontSize: '0.7rem !important', marginLeft: '-0.05rem' }
        }}
        InputLabelProps={{
          className: classes.propStyles,
        }}
        inputProps={{
          maxLength: maxLenghth,
        }}
        FormHelperTextProps={{
          sx: { WebkitTextFillColor: errorTextColor ? '#37C390' : "red" }
        }}
        InputProps={{
          className: classes.propStyles,
          endAdornment: (
            <InputAdornment position="end" className={IconClass}>
              <IconButton onClick={handleClickShowPassword} size="small">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
