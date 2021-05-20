import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateJourney from "./components/journeys/Create";
import "./css/App.css";
import { Helmet } from "react-helmet";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Account from "./components/user/Account";
import JourneyListing from "./components/journeys/Listing";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./firebase/Auth";
import PasswordReset from "./components/user/PasswordReset";
import Dashboard from "./components/journeys/Dashboard";
import NotFound from "./components/NotFound";
import EditJourney from "./components/journeys/Edit";
import Invitation from "./components/Invitation";

const loadScript = (url, setLoaded) => {
  const script = document.createElement("script");
  script.type = "text/javascript";

  script.addEventListener("load", () => {
    setLoaded(true);
    window.loaded = true;
  });

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      setLoaded
    );
  }, [loaded]);

  return (
    <AuthProvider>
      <Helmet>
        <title>Roadster</title>
      </Helmet>
      <Router>
        <div className="App">
          <Navigation />
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
              <PrivateRoute exact path="/user/account" component={Account} />
              <PrivateRoute
                exact
                path="/user/change-password"
                component={PasswordReset}
              />
              <PrivateRoute
                exact
                path="/journeys/new"
                component={CreateJourney}
              />
              <PrivateRoute exact path="/requests" component={Invitation} />
              <PrivateRoute exact path="/journeys" component={JourneyListing} />
              <PrivateRoute exact path="/journeys/:id" component={Dashboard} />
              <PrivateRoute
                exact
                path="/journeys/:id/edit"
                component={EditJourney}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
