import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom"; //browser router is for state

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";

import { NavBar } from "../navbar/navbar";
import { Row, Col, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super(); //means call the constructor of the parent class
    this.state = {
      movies: [],
      user: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
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

  handleFavorite = (movieId, action) => {
    const { username, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && username !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://myfavflixdb.herokuapp.com/users/${username}/favorites/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://tmyfavflixdb.herokuapp.com/users/${username}/favorites/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  //  src/components/main-view/main-view.jsx
  onLoggedIn = (authData) => {
    const { username, email, birthday, favoriteMovies } = authData.user;
    this.setState({ username, favoriteMovies: favoriteMovies || [] });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    // localStorage.setItem("user", username);
    localStorage.setItem("email", email);
    localStorage.setItem("birthday", birthday);
    this.getMovies(authData.token);
  };
  // onLoggedIn(authData) {
  //   console.log(authData);
  //   this.setState({
  //     user: authData.user.Username,
  //   });

  //   localStorage.setItem("token", authData.token);
  //   localStorage.setItem("user", authData.user.Username);
  //   this.getMovies(authData.token);
  // }

  //when user logs out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  // //When a user successfully registers
  // onRegistration(register) {
  //   this.setState({
  //     register,
  //   });
  // }
  render() {
    const { movies, user, favoriteMovies } = this.state;
    //did have register above***
    return (
      <Router>
        <div>
          <NavBar user={user} />
          <Container fluid className='bg-dark main-view-container'>
            <Row className='main-view  justify-content-md-center'>
              <Route
                exact
                path='/'
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  //before movies have been loaded
                  if (movies.length === 0) return <div className='main-view' />;
                  return movies.map((m) => (
                    <Col md={3} sm={6} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ));
                }}
              />

              <Route
                path='/register'
                render={() => {
                  if (user) return <Redirect to='/' />;
                  return (
                    <Col lg={8} md={8}>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />

              <Route
                path={`/users/${user}`}
                render={({ history }) => {
                  if (!user) return <Redirect to='/' />;
                  return (
                    <Col>
                      <ProfileView
                        user={user}
                        onBackClick={() => history.goBack()}
                        movies={movies}
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path={`/user-update/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to='/' />;
                  return (
                    <Col>
                      <UserUpdate
                        user={user}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />

              <Route
                path='/movies/:movieId'
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className='main-view' />;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </Row>

            {/* new code below */}

            <Route
              path='/directors/:name'
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path='/genres/:name'
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
export default MainView;
