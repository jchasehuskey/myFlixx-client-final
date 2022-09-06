import React from "react";
import axios from "axios";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Nav, Navbar, Container } from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super(); //means call the constructor of the parent class
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://myfavflixdb.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMovies(token) {
    axios
      .get("https://myfavflixdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  // onLoggedIn(user) {
  //   this.setState({
  //     user,
  //   });
  // }

  //  src/components/main-view/main-view.jsx
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // if (user) return <MainView />;

    //only turned this off for tesing*********
    // if (!register)
    //   return (
    //     <RegistrationView
    //       onRegistration={(register) => this.onRegistration(register)}
    //     />
    //   );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view' />;

    //if no movie is selected show the list -
    //if a movie is selected show the Movie View details
    return (
      <div>
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
        <Container fluid className='bg-dark main-view-container'>
          {selectedMovie ? ( //column below was originally 9
            <Row className=''>
              <Col lg={12}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row className='justify-content-lg-center'>
              {movies.map((movie) => (
                <Col lg={3} md={4} sm={6}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
export default MainView;
