import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: '0 5em',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Welcome to Roadster</h1>
        </Grid>
        <Grid item xs={6}>
          <h2>Welcome to the landing page. It will be fun. Enjoy your life</h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
