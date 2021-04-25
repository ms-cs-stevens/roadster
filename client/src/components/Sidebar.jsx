import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Grid,
    Paper,
    Typography,
    Link
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { title, description, social } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      {social.map((network) => (
        <Link display="block" variant="body1" href="#" key={network}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};