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
  // Image,
  Nav,
  Navbar,
} from "react-bootstrap";
// import bgImg from "./images/myflix.jpeg";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (
    <div>
      <Navbar fluid bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>MyFlixx Movies</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Movies</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ width: "28rem" }}>
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ marginTop: 100 }}>
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
                    style={{ marginTop: 20 }}
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Submit
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
