import React, { useContext, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();
  const { setIsAuthenticated } = useContext(UserContext);
  const [name, setName] = useState('');

  async function getName() {
    try {
      const res = await axios.get('http://localhost:5000/newsfeed/', {
        headers: {
          token: localStorage.token,
        },
      });
      console.log(res.data);
      setName(res.data.user_name);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Postinger</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home" onClick={() => history.push('/')}>
              Home
            </Nav.Link>
            <Nav.Link href="#link">
              <Link to="/add_post">
                <div className="chip">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  Add post
                </div>
              </Link>
            </Nav.Link>
            <NavDropdown title={name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <Button onClick={(e) => logout(e)}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
