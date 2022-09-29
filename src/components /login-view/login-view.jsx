import React, { useState } from "react";
import PropTypes from "prop-Types";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be atleast 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be atleast 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://myfavflixdb.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
          console.log("succesfully logged in");
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  return (
    <div
      id='classicformpage'
      className='login-container'
      style={{
        backgroundImage:
          "url(" + require(".././images/denverSkyline.jpeg") + ")",
      }}
    >
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
                className='register-button'
                variant='primary'
                type='submit'
              >
                <Link to={"/register"}>Register here</Link>
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
