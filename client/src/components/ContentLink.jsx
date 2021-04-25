import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Grid,
    Divider,
    Typography
 } from '@material-ui/core';
import TextContent from './TextContent';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function ContentLink(props) {
  const classes = useStyles();
  const { information, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {information.map((info) => (
        <TextContent className={classes.markdown} key={info}>
          {info}
        </TextContent>
      ))}
    </Grid>
  );
}

ContentLink.propTypes = {
  information: PropTypes.array,
  title: PropTypes.string,
};