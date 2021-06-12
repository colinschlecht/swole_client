import React from 'react';
import { api } from '../services/api';

const Home = ({ auth, onLogout }) => {
  const onLogoutClick = () => {
    onLogout();
  };

  return (
    <div>
      <h1>Suns out, Guns out</h1>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Home;
