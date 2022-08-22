import React from "react";
import axios from "axios";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Nav, Navbar, Container } from "react-bootstrap";

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

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view' />;

    //if no movie is selected show the list -
    //if a movie is selected show the Movie View details
    return (
      <div className='bg-dark '>
        <Navbar fluid bg='dark' variant='dark' style={{ marginBottom: 80 }}>
          <Container>
            <Navbar.Brand href='#home'>MyFlixx Movies</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='#home'>Movies</Nav.Link>
              <Nav.Link href='#features'>Features</Nav.Link>
              <Nav.Link href='#pricing'>Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid>
          <Row className='main-view justify-content-md-center'>
            {selectedMovie ? (
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ) : (
              movies.map((movie) => (
                <Col md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
export default MainView;
