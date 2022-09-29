import React, { useState } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";

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
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
    birthdateErr: "",
  });

  // validate user inputs

  const validate = () => {
    let isReq = true;
    setValues((prev) => {
      return {
        usernameErr: "",
        passwordErr: "",
        emailErr: "",
        birthdayErr: "",
      };
    });
    if (!username) {
      // setValues re-defines values through a callback that receives
      // the previous state of values & must return values updated
      setValues((prevValues) => {
        return { ...prevValues, usernameErr: "Username is required." };
      });
      isReq = false;
    } else if (username.length < 6) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          usernameErr: "Username must be at least 6 characters long.",
        };
      });
    }
    if (!password) {
      setValues((prevValues) => {
        return { ...prevValues, passwordErr: "Password is required." };
      });
      isReq = false;
    } else if (password.length < 6) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          passwordErr: "Password must be at least 6 characters long.",
        };
      });
      isReq = false;
    }
    if (!email) {
      setValues({
        ...values,
        emailErr: "Email is required.",
      });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues((prevValues) => {
        return { ...prevValues, emailErr: "Enter a valid email address." };
      });
      isReg = false;
    }
    if (!birthdate) {
      setValues((prevValues) => {
        return { ...prevValues, birthdateErr: "Enter a valid date." };
      });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      //was orginally herokuapp.com/login
      axios
        .post("https://myfavflixdb.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthdate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful! Please Login.");
          window.open("/", "_self"); //allows page to open in current tabl
          // props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("error registering the user");
          alert("unable to register");
        });
    }
  };

  return (
    <div
      id='classicformpage'
      className='registration-container'
      style={{
        backgroundImage:
          "url(" + require(".././images/denverSkyline.jpeg") + ")",
      }}
    >
      <Container className='container-register'>
        <Row className='d-flex align-items-center register-flex'>
          <Col>
            <h2>Movie browsing at its finest</h2>
          </Col>
          <Col className='register-form'>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Welcome to my Flixx, please register</Card.Title>
                  <Form>
                    <Form.Group controlId='formUsername'>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      {values.usernameErr && (
                        <p className='validation-message'>
                          {values.usernameErr}
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                      <Form.Label>Password: </Form.Label>
                      <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {values.passwordErr && (
                        <p className='validation-message'>
                          {values.passwordErr}
                        </p>
                      )}
                      {values.usernameErr && (
                        <p className='validation-message'>
                          {values.usernameErr}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group controlId='formEmail'>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control
                        type='email'
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        minLength='8'
                      />
                      {values.emailErr && (
                        <p className='validation-message'>{values.emailErr}</p>
                      )}
                    </Form.Group>
                    <Form.Group controlId='formBirthday'>
                      <Form.Label>Birthday: </Form.Label>
                      <Form.Control
                        type='date'
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                      />
                      {values.birthdateErr && (
                        <p className='validation-message'>
                          {values.birthdateErr}
                        </p>
                      )}
                    </Form.Group>
                  </Form>

                  <Button
                    className='registration-button'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                  <p></p>
                  <Button className='login-button'>
                    <Link to={"/"}>Login</Link>
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
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
  }),
};
