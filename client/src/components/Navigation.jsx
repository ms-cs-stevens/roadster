import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './user/SignOut';
import { AuthContext } from '../firebase/Auth';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="App-header">
      Roadster
      <NavLink exact activeClassName="active" className="App-link" to="/">
        Home
      </NavLink>
      {currentUser ? (
        <NavLink
          exact
          activeClassName="active"
          className="App-link"
          to="/journeys/new"
        >
          Plan your Trip
        </NavLink>
      ) : ('')}
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
    </header>
  );
};

export default Navigation;
