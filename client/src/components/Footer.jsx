import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Grid,
    Container,
    Typography,
    Link
} from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © TEAM SANS@Stevens'}
      <Link color="inherit" href="https://github.com/ms-cs-stevens/roadster">
        Our Repo
      </Link>{'Link to GitHub'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    }
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
      <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="h6" align="center" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
             {description}
            </Typography>
        
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="https://google.com/" className={classes.icon}>
                  <img src="" alt="link1" />
                </a>
                <a href="https://google.com/" className={classes.icon}>
                  <img src="" alt="link2" />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
            
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};