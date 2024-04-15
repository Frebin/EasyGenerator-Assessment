import React from 'react';
import { Grid, Typography } from '@mui/material';

import classes from 'src/assets/css/SideImage.module.css';

interface SideImageProps {
    image_url: string;
    showText?: boolean;
    textToBeShown?: string;
}

export default function SideImage({
  image_url,
  showText,
  textToBeShown,
}: SideImageProps) {
  return (
    <>
      <Grid
        item
        className={classes.imgCard}
        sx={{
          backgroundImage: `url(${image_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      ></Grid>
      {showText ? (
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            marginLeft: {xs: '1rem', md: '3rem'},
            marginTop: '1rem',
            maxWidth: '100% !important',
          }}
        >
          <Typography variant="body1" className={classes.welcome}>
            {textToBeShown}
          </Typography>
        </Grid>
      ) : null}
    </>
  );
}