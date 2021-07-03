import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Login = () => {
  const { setIsAuthenticated } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const settingInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      const res = await axios.post('http://localhost:5000/auth/login', user);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Form className="py-3" onSubmit={onSubmitForm}>
        <h1 className="text-center my-3">Log in</h1>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email || ''}
            onChange={(e) => settingInput(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password || ''}
            onChange={(e) => settingInput(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
      <Link to="/register">Register now</Link>
    </Fragment>
  );
};

export default Login;
