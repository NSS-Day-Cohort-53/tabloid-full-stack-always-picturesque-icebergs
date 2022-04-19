import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import { Tags } from "./TagView";
import { AllCategories } from "./Categories";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/feed" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/category">
          <AllCategories />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/Tags">
          <Tags />
        </Route>
      </Switch>
    </main>
  );
}
