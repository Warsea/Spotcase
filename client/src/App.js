import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// context
import UserContext from './context/UserContext';
import { bool } from 'prop-types';
import axios from 'axios';
import AddPost from './components/AddPost';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };

  async function authOnLoad() {
    try {
      const res = await axios.get('http://localhost:5000/auth/is-verified', {
        headers: {
          token: localStorage.token,
        },
      });

      res.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    authOnLoad();
  });

  return (
    <Fragment>
      <Router>
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {isAuthenticated ? <NavBar /> : null}
          <Container>
            <Row className="justify-content-center">
              <Col lg="6">
                <Switch>
                  <Route exact path="/register">
                    {!isAuthenticated ? <Register /> : <Redirect to="/" />}
                  </Route>
                  <Route exact path="/login">
                    {!isAuthenticated ? <Login /> : <Redirect to="/" />}
                  </Route>
                  <Route exact path="/add_post">
                    {isAuthenticated ? <AddPost /> : <Redirect to="/login" />}
                  </Route>
                  <Route exact path="/">
                    {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </UserContext.Provider>
      </Router>
    </Fragment>
  );
}

export default App;
