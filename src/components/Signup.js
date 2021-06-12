import React, { useState, useEffect } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { api } from '../services/api';

const Signup = ({ onSignup, routerProps, showAlert, renderAlert }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password_confirmation: passwordConfirm,
      exercise_time_id: 1,
      exercise_discipline_id: 1,
      diet_id: 1,
      gender_preference_id: 1,
      location_id: 1,
      music_preference_id: 1,
    };
    api.auth.signup(newUser).then((res) => onSignup(res, routerProps));
  };

  return (
    <>
      {/* {showAlert && renderAlert()} */}
      <div className='container pt-5'>
        <h1 className='mb-3 text-center' style={{ letterSpacing: '0.5rem' }}>
          Sign Up
        </h1>
        <Form onSubmit={onFormSubmit}>
          <Row className='justify-content-center'>
            <div className='col-10 col-sm-8 col-md-5 my-3'>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Row>
          <Row className='justify-content-center'>
            <div className='col-10 col-sm-8 col-md-5 my-3'>
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
          <Row className='justify-content-center'>
            <div className='col-10 col-sm-8 col-md-5 my-3'>
              <input
                className='form-control'
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Row>
          <Row className='justify-content-center'>
            <div className='col-10 col-sm-8 col-md-5 my-3'>
              <input
                className='form-control'
                type='password'
                name='passwordConfirmation'
                placeholder='Confirm Password'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </Row>
          <Row className='justify-content-center'>
            <Button
              variant='success'
              size='lg'
              block
              style={{ borderRadius: '8px' }}
              className='col-5 col-lg-3 mt-4'
              type='submit'
            >
              Create <span className='d-none d-md-inline-flex'>New</span>{' '}
              Account
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Signup;
