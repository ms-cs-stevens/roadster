import React, { useContext } from "react";
import { 
  makeStyles,
  Toolbar,
  Button,
  Link,
  IconButton,
  Typography,
  MuiAppBar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Signout from "./user/SignOut";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


export default function Navigation(props) {
  const classes = useStyles();
  const { title } = props;
  const { currentUser } = useContext(AuthContext);


//<MuiAppBar elevation={0} position="static"/>;

  return (
  <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Link
          variant="h6"
          underline="none"
          className={clsx(classes.rightLink, classes.linkSecondary)}
          href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-during-covid19.html"
        >
          {'! COVID Travel Guidelines !'}
        </Link>
      <NavLink exact activeClassName="active" className="App-link" to="/">
        Home
      </NavLink>
      {currentUser ? (
        <Signout />
      ) : (
        <>
          <NavLink
            exact
            activeClassName="active"
            className="App-link"
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            className="App-link"
            to="/register"
          >
            Sign Up
          </NavLink>
        </>
      )}
    <IconButton>
          <SearchIcon/>
        </IconButton>
        <Button variant="outlined" size="small">
          Login
        </Button>
      </Toolbar>
      </React.Fragment>
  );
}

Navigation.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};