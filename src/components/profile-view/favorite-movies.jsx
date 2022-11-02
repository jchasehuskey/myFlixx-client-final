


import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Card, Col, Filter } from "react-bootstrap";

import "./profile-view.scss";

export function FavoriteMoviesView(props) {
  const { movies,  currentUser, token, handleFavorite } = props;

  //when setting this to empty array, I do not get bug.  Will see if this helps or not.
    const favoriteMovies = [];

  //new code
  const favoriteMoviesId = favoriteMovies;
  {
    favoriteMovies && favoriteMovies.map((m) => m._id);
  }

  // old code
  //   const favoriteMoviesId = favoriteMovies.map((m) => m._id);

  const favoriteMoviesList = movies.filter((m) => {
    return favoriteMoviesId.includes(m._id);
  });

  if (!favoriteMovies) {
    return null;
  }

  // const handleMovieDelete = (movieId) => {
  //   axios
  //     .delete(
  //       `https://myfavflixdb.herokuapp.com/users/${currentUser}/movies/${movieId}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then(() => {
  //       alert(`The movie was successfully deleted.`);
  //       window.open("/users/:username", "_self");
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <Fragment>
      {favoriteMoviesList.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        favoriteMoviesList.map((movie) => {
          return (
            <Col xs={10} sm={8} md={6} lg={4}>
              <Card id='movie-card'>
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img variant='top' src={movie.ImagePath} />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button
                      className='button'
                      variant='outline-primary'
                      size='sm'
                    >
                      Open
                    </Button>
                  </Link>
                  <Button
                    className='button ml-2'
                    variant='outline-primary'
                    size='sm'
                    onClick={() => {
                      // handleMovieDelete(movie._id, 'remove');
                      handleFavorite(movie._id, 'remove');
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      )}
    </Fragment>
  );
}