import React from 'react';

import {
    Grid,
    makeStyles,
    CssBaseline,
    Container
} from "@material-ui/core";

//favicons
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

//page components
import Navigation from './Navigation.jsx';
import MainBanner from './MainBanner.jsx';
import FeatureList from './FeatureList.jsx';
import ContentLink from './ContentLink.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx'

//filler content
import a from './info1.md';
import b from './info2.md';
import c from './info3.md';

const information = [a, b, c];

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainBanner = {
  title: 'Happy travels',
  description:
    "Trust us to help you plan the best trips of your life.",
  image: 'https://source.unsplash.com/random',
  imgText: 'Road trip stock image',
  linkText: 'Read more',
};

const sidebar = {
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
}

const featureList = [
  {
    title: 'Scheduling Trips',
    description:
      'Go wherever you want, whenever you want and plan your trips to perfection',
    image: 'https://source.unsplash.com/random',
    imageText: 'Roadster trips stock image',
  },
  {
    title: 'Take your friends along',
    description:
      'A safe, secure platform to add your own friends or meet like minded people with the same destination in mind',
    image: 'https://source.unsplash.com/random',
    imageText: 'Friends on Roadster stock image',
  },
];

const Landing = () => {
  const classes = useStyles();
  return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Navigation title="Roadster"/>
        <contentLink>
          <MainBanner info={mainBanner} />
          {/* <Grid container spacing={4}>
            {featureList.map((info) => (
              <FeatureList key={info.title} information={info} />
            ))}
          </Grid> */}
          <Grid container spacing={5} className={classes.mainGrid}>
            <ContentLink title="Your Journey" information={information} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </contentLink>
      </Container>
      <Footer title="Contact Us" description="Connect with us anytime" />
    </React.Fragment>
  );
};

export default Landing;

/*
<Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Welcome to Roadster</h1>
        </Grid>
        <Grid item xs={6}>
          <h2>Welcome to RoadTrippers</h2>

        </Grid>
      </Grid>
*/