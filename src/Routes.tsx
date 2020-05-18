import React, { FunctionComponent } from "react";
import { Router, Switch, Route } from "react-router";

const Routes: FunctionComponent = () => {
  return (
    <Router basename={""}>
      <Switch>
        <Route>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
