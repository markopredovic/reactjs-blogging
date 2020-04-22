import React, { useEffect } from "react";
import AppContext from "./context/appContext";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import ServicesPage from "./components/pages/ServicesPage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import LogoutPage from "./components/pages/LogoutPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import Blog from "./components/pages/Blog";
import PostDetailsPage from "./components/pages/PostDetailsPage";
import AddPostPage from "./components/pages/AddPostPage";
import EditPostPage from "./components/pages/EditPostPage";
import MyPostsPage from "./components/pages/MyPostsPage";
import { useApp } from "./hooks/useApp";
import "./css/bootstrap.min.css";
import "./App.css";
import client from "./apollo-client";

function App() {
  const {
    token,
    user,
    posts,
    userLoggedIn,
    userLoggedOut,
    updateUser,
  } = useApp();

  useEffect(() => {
    const token = localStorage.getItem("bloggingtoken");
    if (!!token) {
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      const user = {
        id: decoded.userId,
        name: decoded.userName,
      };
      userLoggedIn({ user, token });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ token, user, posts, userLoggedIn, userLoggedOut, updateUser }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/profile" exact component={UserProfilePage} />
            <Route path="/services" exact component={ServicesPage} />
            <Route path="/posts" exact component={Blog} />
            <Route path="/posts/new" exact component={AddPostPage} />
            <Route path="/edit/post/:id" children={<EditPostPage />} />
            <Route path="/posts/:id" children={<PostDetailsPage />} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/logout" exact component={LogoutPage} />
            <Route path="/my-posts" exact component={MyPostsPage} />
          </Switch>
          <Footer />
        </Router>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
