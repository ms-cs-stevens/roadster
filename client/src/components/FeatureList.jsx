import React from 'react';
import PropTypes from 'prop-types';
import { 
  makeStyles,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeatureList(props) {
  const classes = useStyles();
  const { info } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {info.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {info.description}
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={info.image} title={info.imageTitle} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeatureList.propTypes = {
  info: PropTypes.object,
};