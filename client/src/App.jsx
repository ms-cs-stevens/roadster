import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import CreateJourney from "./components/journeys/Create";
import "./css/App.css";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Account from "./components/user/Account";
import { AuthProvider } from "./firebase/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/journeys/new" component={CreateJourney} />
            </Switch>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
