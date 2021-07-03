import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Register = () => {
  const history = useHistory();
  const { setIsAuthenticated } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const { name, email, password } = inputs;

  const settingInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const user = { name, email, password };
      const res = await axios.post('http://localhost:5000/auth/register', user);

      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Form className="py-3" onSubmit={onSubmitForm}>
        <h1 className="text-center my-3">Register</h1>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Enter your name"
            value={name || ''}
            onChange={(e) => settingInput(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email || ''}
            onChange={(e) => settingInput(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
      <Link to="/login">Log In</Link>
    </Fragment>
  );
};

export default Register;
