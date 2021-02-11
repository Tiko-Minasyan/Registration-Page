import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";
import RegistrationPage from "../components/RegistrationPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;

// <Header />