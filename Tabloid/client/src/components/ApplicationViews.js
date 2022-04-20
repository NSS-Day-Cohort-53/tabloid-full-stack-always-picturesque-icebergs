import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import { Tags } from "./TagView";
import { AllCategories } from "./Categories";
import { Comments } from "./Comments/Comments";

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

        <Route path="/posts/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comments/:id">
          {isLoggedIn ? <Comments /> : <Redirect to="/login" />}
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
