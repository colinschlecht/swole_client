import React, { useState } from 'react';
import { api } from '../services/api';
import { Form, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Login = ({ onLogin, routerProps, showAlert, renderAlert }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    api.auth.login(newUser).then((res) => onLogin(res, routerProps));
  };

  return (
    <>
      {/* {showAlert && renderAlert()} */}
      <div className='container pt-5'>
        <h1 className='mb-5 text-center' style={{ letterSpacing: '0.5rem' }}>
          Login
        </h1>
        <Form onSubmit={onFormSubmit}>
          <Row className='justify-content-center align-items-center'>
            <div className='col-10 col-md-5 my-3'>
              <input
                type='text'
                className='form-control'
                name='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Row>
          <Row className='justify-content-center align-items-center'>
            <div className='col-10 col-md-5 my-3'>
              <input
                type='password'
                className='form-control'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Row>
          <Row className='justify-content-center align-items-center'>
            <Button
              variant='info'
              size='lg'
              block
              style={{ borderRadius: '8px' }}
              className='col-5 col-sm-4 col-lg-2 mt-4 mb-3'
              type='submit'
            >
              Login
            </Button>
   
          </Row>
          <Row className='justify-content-center align-items-center'>
            <Link to="/signup" className="item"><Button  variant='info'
                  size='lg'
                  block
                  style={{ borderRadius: '8px' }}
                  className='col-5 col-sm-4 col-lg-2 mt-4 mb-3'>Sign Up</Button></Link>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Login;
