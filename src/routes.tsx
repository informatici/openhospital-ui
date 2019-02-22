import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./modules/home/Home";
import Test from "./modules/test/Test";
import Header from "./modules/header/Header";
// import PageNotFound from "./shared/PageNotFound/PageNotFound";
// import { TabTypes } from "./types/tab";


const Routes = () => (
    <Switch>
        <Header />
        <Redirect from="/" exact={true} to="/dashboard" />
        <Route path="/dashboard" component={Home} />
        <Route path="/test" component={Test} />
        {/* <Route path="/login" component={Login} />
    <Route path="/personal-profile" component={PersonalProfile} /> */}
        {/* <Route
      path="/activities/:listName"
      render={props => <ActivitiesList key={props.match.params.listName} {...props} />}
    /> */}

        {/* If no Route matches, show PageNotFound component */}
        {/* <Route component={PageNotFound} /> */}
    </Switch>
);

export default Routes;