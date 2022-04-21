import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import { Tags } from "./TagView";
import { CreateTag } from "./TagCreate";
import { AllCategories } from "./Categories";
import { AddCategoryForm } from "./AddCategory";

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
        <Route path="/tag" exact>
          <Tags />
        </Route>
        <Route path="/tag/new">
          <CreateTag/>
          
         </Route>

      </Switch>
    </main>
  );
}
