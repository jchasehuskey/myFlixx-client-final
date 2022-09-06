import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  //declare hooks for each input''
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdateErr, setBirthdateErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (
    <div
      id='classicformpage'
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

      <Container className='container-register'>
        <Row className='d-flex align-items-center'>
          <Col>
            <h2>Movie browsing at its finest</h2>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Welcome to my Flixx, please register</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password: </Form.Label>
                      <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control
                        type='email'
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        minLength='8'
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday: </Form.Label>
                      <Form.Control
                        type='date'
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Form>

                  <Button
                    className='registration-button'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
