// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; //browser router is for state

// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { RegistrationView } from "../registration-view/registration-view";
// import { Row, Col, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
// import "./main-view.scss";

// export class MainView extends React.Component {
//   constructor() {
//     super(); //means call the constructor of the parent class
//     this.state = {
//       movies: [],
//       selectedMovie: null,
//       user: null,
//       registered: null,
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user"),
//       });
//       this.getMovies(accessToken);
//     }
//   }

//   getMovies(token) {
//     axios
//       .get("https://myfavflixdb.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         // Assign the result to the state
//         this.setState({
//           movies: response.data,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   // setSelectedMovie(newSelectedMovie) {
//   //   this.setState({
//   //     selectedMovie: newSelectedMovie,
//   //   });
//   // }

//   //  src/components/main-view/main-view.jsx
//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({
//       user: authData.user.Username,
//     });

//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.Username);
//     this.getMovies(authData.token);
//   }

//   //when user logs out
//   onLoggedOut() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     this.setState({
//       user: null,
//     });
//   }

//   // //When a user successfully registers
//   // onRegistration(register) {
//   //   this.setState({
//   //     register,
//   //   });
//   // }
//   render() {
//     const { movies, user } = this.state;

//     if (!user)
//       return (
//         <Row>
//           <Col>
//             <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//           </Col>
//         </Row>
//       );

//     // if (movies.length === 0) return <div className='main-view' />;

//     return (
//       <Router>
//         <div>
//           <Navbar className='main-view-nav' fluid>
//             <Container className='nav-container' fluid>
//               <Navbar.Brand className='nav-text nav-logo' href='#home'>
//                 MyFlixx Movies
//               </Navbar.Brand>

//               <Nav className='nav-main'>
//                 <Nav.Link className='nav-text' href='#home'>
//                   Movies
//                 </Nav.Link>
//                 <Nav.Link className='nav-text' href='#features'>
//                   Features
//                 </Nav.Link>
//                 <Nav.Link className='nav-text' href='#pricing'>
//                   Login
//                 </Nav.Link>
//                 {/* this dropdown is not necessary */}
//                 <NavDropdown
//                   className='nav-text'
//                   id='nav-dropdown-dark-example'
//                   title='Account'
//                   menuVariant='dark'
//                 >
//                   <NavDropdown.Item
//                     className='nav-text'
//                     href='#action/3.1'
//                     //see how this works below
//                     onClick={() => {
//                       this.onLoggedOut();
//                     }}
//                   >
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//             </Container>
//           </Navbar>
//           <Container fluid className='bg-dark main-view-container'>
//             {/* <Row className='main-view justify-content-md-center'> */}
//             <Route
//               exact
//               path='/'
//               render={() => {
//                 if (!user)
//                   return (
//                     <Col>
//                       <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//                     </Col>
//                   );

//                 //before movies have been loaded
//                 if (movies.length === 0) return <div className='main-view' />;
//                 return movies.map((m) => (
//                   <Col md={3} key={m._id}>
//                     <MovieCard movie={m} />
//                   </Col>
//                 ));
//               }}
//             />

//             <Route
//               path='/register'
//               render={() => {
//                 if (user) return <Redirect to='/' />;
//                 return (
//                   <Col>
//                     <RegistrationView />
//                   </Col>
//                 );
//               }}
//             />

//             <Route
//               path='/movies/:movieId'
//               render={({ match, history }) => {
//                 if (!user)
//                   return (
//                     <Col>
//                       <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//                     </Col>
//                   );

//                 //before movies have been loaded
//                 if (movies.length === 0) return <div className='main-view' />;
//                 return (
//                   <Col md={8}>
//                     <MovieView
//                       movie={movies.find((m) => m._id === match.params.movieId)}
//                       onBackClick={() => history.goBack()}
//                     />
//                   </Col>
//                 );
//               }}
//             />
//             {/* </Row> */}

//             {/* new code below */}

//             <Route
//               path='/directors/:name'
//               render={({ match, history }) => {
//                 if (!user)
//                   return (
//                     <Col>
//                       <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//                     </Col>
//                   );
//                 //before movies have been loaded

//                 if (movies.length === 0) return <div className='main-view' />;
//                 return (
//                   <Col md={8}>
//                     <DirectorView
//                       director={
//                         movies.find(
//                           (m) => m.Director.Name === match.params.name
//                         ).Director
//                       }
//                       onBackClick={() => history.goBack()}
//                     />
//                   </Col>
//                 );
//               }}
//             />

//             <Route
//               path='/genres/:name'
//               render={({ match, history }) => {
//                 if (!user)
//                   return (
//                     <Col>
//                       <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
//                     </Col>
//                   );
//                 if (movies.length === 0) return <div className='main-view' />;
//                 return (
//                   <Col md={8}>
//                     <GenreView
//                       genre={
//                         movies.find((m) => m.genre.Name === match.params.name)
//                           .genre
//                       }
//                       onBackClick={() => history.goBack()}
//                     />
//                   </Col>
//                 );
//               }}
//             />

//             {/* {selectedMovie ? ( //column below was originally 9
//               <Row className=''>
//                 <Col lg={12}>
//                   <MovieView
//                     movie={selectedMovie}
//                     onBackClick={(newSelectedMovie) => {
//                       this.setSelectedMovie(newSelectedMovie);
//                     }}
//                   />
//                 </Col>
//               </Row>
//             ) : (
//               <Row className='justify-content-lg-center'>
//                 {movies.map((movie) => (
//                   <Col lg={3} md={4} sm={6}>
//                     <MovieCard
//                       key={movie._id}
//                       movie={movie}
//                       onMovieClick={(newSelectedMovie) => {
//                         this.setSelectedMovie(newSelectedMovie);
//                       }}
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             )} */}
//           </Container>
//         </div>
//       </Router>
//     );
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////
// // myFlix-client/src/main-view/main-view.jsx
// import React from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { DirectorView } from "../director-view/director-view";
// import { GenreView } from "../genre-view/genre-view";
// import { RegistrationView } from "../registration-view/registration-view";
// import { Row, Col, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

// export class MainView extends React.Component {
//   constructor() {
//     super();
//     // Initial state is set to null
//     this.state = {
//       movies: [],
//       user: null,
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user"),
//       });
//       this.getMovies(accessToken);
//     }
//   }

//   getMovies(token) {
//     axios
//       .get("https://boiling-coast-93300.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         // Assign the result to the state
//         this.setState({
//           movies: response.data,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({
//       user: authData.user.Username,
//     });

//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.Username);
//     this.getMovies(authData.token);
//   }

//   render() {
//     const { movies, user } = this.state;
//     return (
//       <Router>
//         <div>
//           <Container fluid className='bg-dark main-view-container'>
//             {/* <Row className='main-view justify-content-md-center'> */}
//             <Row className='main-view justify-content-md-center'>
//               <Route
//                 exact
//                 path='/'
//                 render={() => {
//                   if (!user)
//                     return (
//                       <Col>
//                         <LoginView
//                           onLoggedIn={(user) => this.onLoggedIn(user)}
//                         />
//                       </Col>
//                     );
//                   if (movies.length === 0) return <div className='main-view' />;
//                   return movies.map((m) => (
//                     <Col md={3} key={m._id}>
//                       <MovieCard movie={m} />
//                     </Col>
//                   ));
//                 }}
//               />
//               <Route
//                 path='/register'
//                 render={() => {
//                   if (user) return <Redirect to='/' />;
//                   return (
//                     <Col>
//                       <RegistrationView />
//                     </Col>
//                   );
//                 }}
//               />

//               <Route
//                 path='/movies/:movieId'
//                 render={({ match, history }) => {
//                   if (!user)
//                     return (
//                       <Col>
//                         <LoginView
//                           onLoggedIn={(user) => this.onLoggedIn(user)}
//                         />
//                       </Col>
//                     );
//                   if (movies.length === 0) return <div className='main-view' />;
//                   return (
//                     <Col md={8}>
//                       <MovieView
//                         movie={movies.find(
//                           (m) => m._id === match.params.movieId
//                         )}
//                         onBackClick={() => history.goBack()}
//                       />
//                     </Col>
//                   );
//                 }}
//               />

//               <Route
//                 path='/directors/:name'
//                 render={({ match, history }) => {
//                   if (!user)
//                     return (
//                       <Col>
//                         <LoginView
//                           onLoggedIn={(user) => this.onLoggedIn(user)}
//                         />
//                       </Col>
//                     );
//                   if (movies.length === 0) return <div className='main-view' />;
//                   return (
//                     <Col md={8}>
//                       <DirectorView
//                         director={
//                           movies.find(
//                             (m) => m.Director.Name === match.params.name
//                           ).Director
//                         }
//                         onBackClick={() => history.goBack()}
//                       />
//                     </Col>
//                   );
//                 }}
//               />

//               <Route
//                 path='/genres/:name'
//                 render={({ match, history }) => {
//                   if (!user)
//                     return (
//                       <Col>
//                         <LoginView
//                           onLoggedIn={(user) => this.onLoggedIn(user)}
//                         />
//                       </Col>
//                     );
//                   if (movies.length === 0) return <div className='main-view' />;
//                   return (
//                     <Col md={8}>
//                       <GenreView
//                         genre={
//                           movies.find((m) => m.Genre.Name === match.params.name)
//                             .Genre
//                         }
//                         onBackClick={() => history.goBack()}
//                       />
//                     </Col>
//                   );
//                 }}
//               />
//             </Row>
//           </Container>
//         </div>
//       </Router>
//     );
//   }
// }
// export default MainView;

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
import { Row, Col, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super(); //means call the constructor of the parent class
    this.state = {
      movies: [],
      user: null,
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

  //when user logs out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }
  render() {
    const { movies, user, register } = this.state;

    return (
      <Router>
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
                {/* this dropdown is not necessary */}
                <NavDropdown
                  className='nav-text'
                  id='nav-dropdown-dark-example'
                  title='Account'
                  menuVariant='dark'
                >
                  <NavDropdown.Item
                    className='nav-text'
                    href='#action/3.1'
                    //see how this works below
                    onClick={() => {
                      this.onLoggedOut();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
          <Container fluid className='bg-dark main-view-container'>
            <Row className='main-view justify-content-md-center'>
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
                    <Col md={3} key={m._id}>
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
                        movies.find((m) => m.genre.Name === match.params.name)
                          .genre
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
