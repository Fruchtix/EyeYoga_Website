import React from "react";
import { Home, Exercise } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.THIRDYDAYCHALLENGE}>
          <Exercise />
        </Route>
        <Route path={ROUTES.HOME}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
