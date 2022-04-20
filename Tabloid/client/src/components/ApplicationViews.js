import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { Tags } from "./TagView";
import { AllCategories } from "./Categories";
import { AddCategoryForm } from "./AddCategory";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/category" exact>
          <AllCategories />
        </Route>

        <Route path="/category/new">
          <AddCategoryForm />
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
