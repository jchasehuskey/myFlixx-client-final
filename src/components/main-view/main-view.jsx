import React from 'react';
// import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//#1
import { setMovies, setUser} from '../../actions/actions';

//#2
import MoviesList from '../movies-list/movies-list';

import { LoginView } from "../login-view/login-view";

//will be removing movine card soon
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// import { MovieView } from '../movie-view/movie-view2';
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import {ProfileView}  from "../profile-view/profile-view";
// import { ProfileView } from '../profile-view/profile-view2';

import { NavBar } from "../navbar/navbar";
import { Row, Col, Container } from "react-bootstrap";
import "./main-view.scss";


//for redux, remove "export" from class extends
class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null.  but have to remove entirely for redux
    // this.state = {
    //   movies: [],
    //   user: null,
    //   favoriteMovies: [],


    // };
    this.state = {

      user: null,
      favoriteMovies: [],


    };


   
  }



 componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      // this.getUser(accessToken);
    }
  }



  getMovies(token) {
    axios
      .get('https://myfavflixdb.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
            // this.setState({
        //   movies: res.data,
        // });
      this.props.setMovies(response.data);
      console.log('movies set')
    
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Fetch user data.  
  // getUser(token) {
  //   const user = localStorage.getItem('user');
  //   axios.get(`https://https://myfavflixdb.herokuapp.com/users/${user}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(response => {
  //       this.props.setUser(response.data);
  //       console.log('user set')
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }








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
    this.props.setUser(authData.user);
  }



  addFavorite(MovieId, action) {

    const { favoriteMovies, user } = this.state;
    // const favoriteMovies=[];
    // const { favoriteMovies } = this.state;
    const token = localStorage.getItem('token');
    if (favoriteMovies.includes((favId) => favId === MovieId)) {
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






 

  render() {
   // const { user, movies, favoriteMovies} = this.state;
    const {  favoriteMovies, user} = this.state;
    let {movies} =this.props;


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

              return <MoviesList movies={movies}/>;
              // return movies.map((m) => (
              //   <Col md={6} lg={3} key={m._id} >
              //     <MovieCard movie={m} />
              //   </Col>
              // ));
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
                    // getUser={user}
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


//THIS MAKES MOVIES THE PROP OF THE MAINVIEW COMPONENT

let mapStateToProps = state => {
  return { 
    movies: state.movies ,
    user:state.user
  }
}


export default connect(mapStateToProps, { setMovies, setUser} )(MainView);




