import React, { useState } from "react";
import PropTypes from "prop-Types";
import {
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Card,
  CardGroup,
} from "react-bootstrap";
import "./login-view.scss";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myfavflixdb.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });

    // console.log(username, password);
    // props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <div
      id='classicformpage'
      // className='bg-dark '
      style={{
        backgroundImage:
          "url(" + require(".././images/denverSkyline.jpeg") + ")",
      }}
    >
      <Navbar className='main-view-nav' fluid>
        <Container className='nav-container' fluid>
          <Navbar.Brand className='nav-text nav-logo' href='#home'>
            MyFlixx Movies
          </Navbar.Brand>
          <Nav className='nav-main'>
            <Nav.Link className='nav-text' href='#home'>
              Movies
            </Nav.Link>
            <Nav.Link className='nav-text' href='#features'>
              Features
            </Nav.Link>
            <Nav.Link className='nav-text' href='#pricing'>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className='container-form'>
        <Row>
          <Col>
            <CardGroup>
              <Card className='card-styling'>
                <Card.Body>
                  <Card.Title>Login</Card.Title>
                  <Form>
                    <Form.Group controlId='formUsername'>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
            <div
              className='d-flex justify-content-start'
              style={{ marginTop: 10 }}
            >
              <Button
                className='login-button'
                variant='primary'
                type='submit'
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                className='register=button'
                variant='primary'
                type='submit'
                onClick={handleRegister}
              >
                Register here
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
