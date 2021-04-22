import CreateJourney from "./components/CreateJourney";
import "./css/App.css";
import Landing from "./components/Landing";
import Navigation from "./components/Navigation";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import { AuthProvider } from "./firebase/Auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
              <Route exact path='/createJourney' component={CreateJourney} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
