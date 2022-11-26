
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Button,
  Card,
  CardGroup,
  Col,
  Link,
  Row
} from 'react-bootstrap';

// import { UpdateUser } from "./update-user";
import { Link } from 'react-router-dom';

import './profile-view.scss';

export default function ProfileView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');
  const { user, onBackClick} = props;
  const [allmovies,setFavoriteMovies]=useState([])
  const [movies,setMovies]=useState([])
  //useEffect essentially tells the browser everything inside of the arrow function -> is going to be executed every time the application renders
  useEffect(() => {
    getFavMovies();
  }, [])

  //whenever anything inside the array changes, it runs whatsever in the useEffect arrow function 

  getFavMovies = () => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://myfavflixdb.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('******* '+response.data.favoriteMovies);
        const token = localStorage.getItem('token');    
        axios
          .get('https://myfavflixdb.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const fMovies = [];
            response.data.favoriteMovies.map((MovieId) => {
              fMovies.push(res.data.find((m) => m._id === MovieId));
            });
            setMovies(fMovies);
// console.log("+++++++++++++ in page movies set: ", this.state);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };  

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!Username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (Username.length < 5) {
      setUsernameErr('Username must be 5 or more characters');
      isReq = false;
    }
    if (!Password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (Password.length < 6) {
      setPasswordErr('Password must be 6 or more characters');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email must be a valid email address');
      isReq = false;
    }

    return isReq;
  };



removeFavorite = (MovieId) => {
  const favoriteMovies=[];
  const token = localStorage.getItem('token');
  if (token !== null && user !== null) {
    setFavoriteMovies({
      favoriteMovies: favoriteMovies.filter((movie) => movie !== MovieId),
    });
    axios
      .delete(
        `https://myfavflixdb.herokuapp.com/users/${user}/movies/${MovieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        getFavMovies();
        console.log(`Movie successfully removed from favorites!`);
        // console.log('******* '+response.data.favoriteMovies);
    })
      .catch((e) => {
        console.error(e);
      });
  }
}

  

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    
    // const username = localStorage.getItem("user");
    const token = localStorage.getItem('token');
    console.log(isReq);
    console.log(token);
    console.log(user);
    if (isReq && token !== null && user !== null) {
      axios
        .put(
          // `https://myfavflixdb.herokuapp.com/users/${username}`,
          `https://myfavflixdb.herokuapp.com/users/${user}`,

          {
            Username: Username,
            Password: Password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          // console.log(data);
          alert('Update successful! Please log in with your new credentials');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((e) => {
          console.error(e);
          alert('Unable to update user infos :(');
        });
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (confirm('Are you sure? This cannot be undone!')) {
    axios
      // .delete(`https://myfavflixdb.herokuapp.com/users/${currentUser}`, {
        .delete(`https://myfavflixdb.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`);//may just need to make this statement a string
        localStorage.clear();
        window.open("/register", "_self");
      })
      .catch((error) => console.error(error));
    }
  };

  // const fMovies = [];
  // response.data.favoriteMovies.map((MovieId) => {
  //   fMovies.push(res.data.find((m) => m._id === MovieId));
  // });
  // setMovies(fMovies);

  return (
  

    
    <Container className="profile-container">
      <Card bg="dark" text="light" className="profile-card">
        <Card.Header className="text-center" as="h5">
          Profile
        </Card.Header>
        <Card.Body>
        {/* <UpdateUser user={user} favoriteMovies={favoriteMovies}/> */}
        <span className="label text-center headline-profile-update">
                Update profile information
              </span>
              <Form>
                <Form.Group
                  className="profile-form-group-username"
                  controlId="formGroupUsername"
                >
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-password"
                  controlId="formGroupPassword"
                >
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password must be 6 or more characters"
                    minLength="6"
                    required
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-email"
                  controlId="formGroupEmail"
                >
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    plsaceholder="Enter your email address"
                    required
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-birthday"
                  controlId="formGroupBirthday"
                >
                  <Form.Label>Date of birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Enter your birthday"
                  />
                  {birthdayErr && <p>{birthdayErr}</p>}
                </Form.Group>
                <Button
                  className="button-profile-view-update"
                  variant="secondary"
                  type="submit"
                  onClick={handleUpdate}
                  // onClick={updateUser}
                >
                  Update
                </Button>
              </Form>
      
        <Row className='mt-5'>
        <h4>Your favorite movies</h4>
      </Row>
      
          <CardGroup className="card-group-profile-mini-cards">
            {movies.map((m) => (
              <Col
                md={6}
                lg={3}
                key={m._id}
                className="profile-movie-card-mini"
              >
                <Card className="h-100" bg="dark" text="light">
                  <Link
                    to={`/movies/${m._id}`}
                    className="profile-movie-card-link"
                  >
                    <Card.Img
                      variant="top"
                      crossOrigin="anonymous | use-credentials"
                      src={m.ImagePath}
                    />
                    <Card.Body>
                      <Card.Title>{m.Title}</Card.Title>
                    </Card.Body>
                  </Link>
                  <Button
                    className="button-profile-view-remove-favorite"
                    variant="outline-danger"
                    size="sm"
                    type="button"
                    // onClick={() => removeFavorite(m._id)}
           
                    // onClick={() => removeFavorite(m._id, )}
                   onClick={()=>{
                    removeFavorite(m._id);
                    
                   }}
                    
                  >
                    Remove
                  </Button>
                </Card>
              </Col>
            ))}
          </CardGroup>
        </Card.Body>
        <Card.Footer className="text-right">
        <Button className='d-block mt-5' variant='danger' onClick={handleDelete}>
        Delete account
      </Button>
          <Button
            className="button-profile-view-back"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}








//general NOTES

//useState can only be used in function componenets, not class componenets.  
//hooks cannot be used inside of if statemtents or functions or loops - basically cannot be nested, must be called in the top level
//useState always returns an array with two values 
//if you pass variables as a function in use state, it will only get ran at inital render once.  Good for using complex values in the useState that require a lot of variables and