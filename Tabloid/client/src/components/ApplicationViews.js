import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import MyPosts from "./Post/MyPosts";
import CreatePost from "./Post/CreatePost";
import EditPost from "./Post/EditPost";
import { Tags } from "./TagView";
import { CreateTag } from "./TagCreate";
import { DeleteTag } from "./TagDelete";
import { AllCategories } from "./Categories";
import { Comments } from "./Comments/Comments";
import { AddCategoryForm } from "./AddCategory";
import { DeleteCategoryForm } from "./DeleteCategory";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/new">
          <CreatePost/>
        </Route>

        <Route path="/posts/edit/:id">
          {isLoggedIn ? <EditPost /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/:id(\d+)">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comments/:id">
          {isLoggedIn ? <Comments /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myposts">
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
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

        <Route path="/category/delete/:id">
          <DeleteCategoryForm />
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
         <Route  path="/tag/delete/:id">
          <DeleteTag/>
         </Route>
      </Switch>
    </main>
  );
}
