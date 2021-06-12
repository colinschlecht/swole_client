import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./navigation/TopNav";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";
import UserProfilePage from "./UserProfilePage";
import { api } from "../services/api";

const App = () => {
  const [auth, setAuth] = useState({ user: {} });
  //! testing purposes
  const [diets, setDiets] = useState([]);

  //! testing purposes
  useEffect(() => {
    //! authentication
    const token = localStorage.token;
    if (token) {
      api.auth.getCurrentUser().then((data) =>
        setAuth({
          user: {
            id: data.user.id,
            name: data.user.name,
          },
        })
      );
    }
  }, []);

  const onLogin = (data, routerProps) => {
    //! authorization
    if (data.jwt) {
      console.log("successfully logged in");
      localStorage.setItem("token", data.jwt);
      setAuth({
        user: {
          id: data.user.id,
          name: data.user.name,
        },
      });
      routerProps.history.push("/");
    } else {
      console.log("login failed");
    }
  };

  const onSignup = (data, routerProps) => {
    if (data.jwt) {
      console.log("successfully signed up");
      localStorage.setItem("token", data.jwt);
      setAuth({
        user: {
          id: data.id,
          email: data.email,
        },
      });
      routerProps.history.push("/");
    } else {
      console.log("sign up failed");
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuth({ ...auth, user: {} });
    window.history.pushState({}, "", "/");
    window.location.reload();
  };

  //pass in props
  const renderProfilePage = () => <UserProfilePage />;
  const renderSignup = () => <Signup onSignup={onSignup} />;
  const renderLogin = () => <Login onLogin={onLogin} />;
  const renderMain = () => <Main auth={auth} />;

  return (
    <>
      <Container fluid>
        <Route path="/signup" exact component={renderSignup} />
        <Route path="/login" exact component={renderLogin} />
        <div className="routes-container">
          <TopNav onLogout={onLogout} />
          <Route path="/" exact component={renderMain} />
          <Route path="/profile" exact component={renderProfilePage} />
        </div>
      </Container>
    </>
  );
};

export default App;
