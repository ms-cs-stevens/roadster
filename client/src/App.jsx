import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import CreateJourney from "./components/journeys/Create";
import CommentsBox from "./components/journeys/CommentsBox";
import "./css/App.css";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Account from "./components/user/Account";
import JourneyShow from "./components/journeys/Show";
import UserJourneys from "./components/journeys/UserJourneys"
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./firebase/Auth";
import PasswordReset from "./components/user/PasswordReset";

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
  }, []);

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
              <Route exact path="/comments" component={CommentsBox}/>
              <PrivateRoute exact path="/user/account" component={Account} />
              <PrivateRoute exact path="/user/change-password" component={PasswordReset} />
              <PrivateRoute exact path="/journeys/new" component={CreateJourney} />
              <PrivateRoute exact path="/journeys" component={UserJourneys} />
              <PrivateRoute exact path="/journeys/:id" component={JourneyShow} />
            </Switch>
          </div>
          {/* <Box mt={5}>
            <Copyright />
          </Box> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
