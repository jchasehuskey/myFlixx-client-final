import React from 'react';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { MovieView } from '../movie-view/movie-view2';
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import ProfileView  from "../profile-view/profile-view";
// import { ProfileView } from '../profile-view/profile-view2';

import { NavBar } from "../navbar/navbar";
import { Row, Col, Container } from "react-bootstrap";
import "./main-view.scss";



export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      favoriteMovies: [],


    };
  }

  getMovies(token) {
    axios
      .get('https://myfavflixdb.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  /* When a user successfully logs in, this function updates the
     `user` property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    const { Username, FavoriteMovies } = authData.user;
    this.setState({
      user: Username,
      favoriteMovies: FavoriteMovies || [],
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favoriteMovies', authData.user. favoriteMovies);
    this.getMovies(authData.token);
  }



  addFavorite(MovieId, action) {
 
    const { user, favoriteMovies } = this.state;
    const token = localStorage.getItem('token');
    if (favoriteMovies.some((favId) => favId === MovieId)) {
      console.log('Movie already added to favorites!');
    } else {
      if (token !== null && user !== null) {
        if (action === "add") {
        this.setState({
          favoriteMovies: [...favoriteMovies, MovieId],
        });
        axios
          .post(
            `https://myfavflixdb.herokuapp.com/users/${user}/movies/${MovieId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            console.log(`Movie successfully added to favorites!`);
          })
          .catch((e) => {
            console.error(e);
          });
          
        }
      }
    }
  }

  removeFavorite(MovieId, action) {
    const { user, favoriteMovies} = this.state;
    // const username = localStorage.getItem("user");
    const token = localStorage.getItem('token');
    if (token !== null && user !== null) {
console.log("+++++++++ curr state: ", this.state);
      this.setState({
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
          console.log(`Movie successfully removed from favorites!`);
          console.log('******* '+response.data.favoriteMovies);
      })
        .catch((e) => {
          console.error(e);
        });
    }
  }




  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    let{userMovies}=this.props;
    const { movies, user, favoriteMovies} = this.state;
    
    //creates multiple areas in console
    // console.log(favoriteMovies);  

    return (
      <Router>
        <NavBar user={user} />
        <Container fluid className='bg-dark main-view-container'>
            <Row className='main-view  justify-content-md-center'>
          <Route
            exact
            path="/"
            render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map((m) => (
                <Col md={6} lg={3} key={m._id} >
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  {/* <ProfileView
                    favoriteMovies={favoriteMovies.map((MovieId) => {
                      return movies.find((m) => m._id === MovieId);
                    })} */}

                    <ProfileView
                    favoriteMovies={()=>{
                      return movies.find()}}
                    user={user}
                    // removeFavorite={this.removeFavorite.bind(this)}
                    onBackClick={() => history.goBack()}
                    getUser={user}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:MovieId"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8} className="movie-view">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.MovieId)}
                    isFavorite={favoriteMovies.includes(match.params.MovieId)}
                    addFavorite={this.addFavorite.bind(this)}
                    onBackClick={() => history.goBack()}

                    // this may not be necessary
                  
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    movies={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <GenreView
                    movies={movies.filter(
                      (m) => m.Genre.Name === match.params.name
                    )}
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
        </Row>
        </Container>
      </Router>
    );
  }
}

MainView.propTypes = {};




