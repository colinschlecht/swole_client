import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { api } from '../services/api';

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
      localStorage.setItem('token', data.jwt);
      setAuth({
        user: {
          id: data.user.id,
          name: data.user.name,
        },
      });
      routerProps.history.push('/');
    } else {
      console.log('login failed');
    }
  };

  const onSignup = (data, routerProps) => {
    if (data.jwt) {
      localStorage.setItem('token', data.jwt);
      setAuth({
        user: {
          id: data.id,
          email: data.email,
        },
      });
      routerProps.history.push('/');
    } else {
      console.log('sign up failed');
    }
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    setAuth({ ...auth, user: {} });
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  return (
    <Container fluid>
      <div className='routes-container'>
        <Route
          path='/signup'
          render={(routerProps) => (
            <Signup onSignup={onSignup} routerProps={routerProps} />
          )}
        />
        <Route
          path='/login'
          render={(routerProps) => (
            <Login onLogin={onLogin} routerProps={routerProps} />
          )}
        />
        <Route
          exact
          path='/'
          render={() =>
            allCloths.length ? (
              <Home idxs={renderFourIdxs()} cloth={allCloths} />
            ) : (
              <Loader />
            )
          }
        />
      </div>
    </Container>
  );
};

export default App;
