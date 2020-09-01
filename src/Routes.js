import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./containers/Login.js";
import Home from "./containers/Home.js";

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}
