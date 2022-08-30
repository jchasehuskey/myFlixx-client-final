import React, { useState } from "react";
import PropTypes from "prop-Types";
import {
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  Row,
  Col,
  Card,
  CardGroup,
} from "react-bootstrap";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };
  //className='bg-dark ' style={{ paddingBottom: "35rem" }}
  return (
    <div
      id='classicformpage'
      // className='bg-dark '
      style={{
        paddingBottom: "27rem",
        backgroundImage:
          "url(" + require(".././images/denverSkyline.jpeg") + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        maxHeight: "100vh", //aligns perfectly with bottom :)
      }}
    >
      <Navbar className='main-view-nav' fluid>
        <Container classname='nav-container' fluid>
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

      <Container style={{ width: "28rem" }}>
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ marginTop: 100, marginBottom: 30 }}>
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
                style={{ width: "5rem", marginRight: 10 }}
                variant='primary'
                type='submit'
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                style={{ width: "8rem" }}
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
