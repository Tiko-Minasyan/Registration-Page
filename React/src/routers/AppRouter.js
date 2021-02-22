import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";
import RegistrationPage from "../components/RegistrationPage";
import EditPage from "../components/EditPage";
import DeletePage from "../components/DeletePage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/profile" component={ProfilePage} />
		<Route path="/edit" component={EditPage} />
		<Route path="/delete" component={DeletePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;