import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Grid,
    Typography,
    Link,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainBanner: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainBannerContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainBanner(props) {
  const classes = useStyles();
  const { info } = props;

  return (
    <Paper className={classes.mainBanner} style={{ backgroundImage: `url(${info.image})` }}>
      {<img style={{ display: 'none' }} src={info.image} alt={info.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainBannerContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {info.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {info.description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {info.linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainBanner.propTypes = {
  info: PropTypes.object,
};