import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./navigation/TopNav";
import Main from "./Main";
import EditUser from './EditUser'
import Login from "./Login";
import Signup from "./Signup";
import UserProfilePage from "./UserProfilePage";
import { api } from "../services/api";

const App = () => {
  const [auth, setAuth] = useState({ user: {} });
  const [locationTesting, setLocationTesting] = useState({ location: {} });

  useEffect(() => {
    //! authentication
    const token = localStorage.token;
    if (token && token != "undefined") {
      api.auth.getCurrentUser().then((data) => {
        setAuth({
          user: {
            id: data.user.id,
            name: data.user.name,
          },
        });
        setLocationTesting({
          location: { latitude: data.user.location.latitude, longitude: data.user.location.longitude },
        });
      });
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
      setLocationTesting({
        location: { latitude: data.user.location.latitude, longitude: data.user.location.longitude },
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
      setLocationTesting({
        location: { latitude: data.user.location.latitude, longitude: data.user.location.longitude },
      });
      routerProps.history.push("/");
    } else {
      console.log("sign up failed");
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuth({ ...auth, user: {} });
    window.history.pushState({}, "", "/login");
    window.location.reload();
  };

  return (
    <>
      <Switch>
        <Route
          path="/signup"
          render={(routerProps) => (
            <Signup routerProps={routerProps} onSignup={onSignup} />
          )}
        />
        <Route
          path="/login"
          render={(routerProps) => (
            <Login routerProps={routerProps} onLogin={onLogin} />
          )}
        />
        <>
          <Container fluid>
            <div className="routes-container">
              <TopNav onLogout={onLogout} auth={auth} />
              <Route
                exact
                path="/profile/:id"
                render={(routerProps) => (
                  <UserProfilePage location={locationTesting} routerProps={routerProps} auth={auth} />
                )}
              />
              <Route
                exact
                path="/profile/:id/edit"
                render={(routerProps) => (
                  <EditUser location={locationTesting} routerProps={routerProps} auth={auth} />
                )}
              />
              <Route
                exact
                path="/"
                render={(routerProps) => (
                  <Main routerProps={routerProps} auth={auth} />
                )}
              />
            </div>
          </Container>
        </>
      </Switch>
    </>
  );
};

export default App;
