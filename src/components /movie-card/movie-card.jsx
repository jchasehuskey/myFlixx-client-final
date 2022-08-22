import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      //container, row, and col -> may not be absolutely necessary.  Not sure if I like it before all was implemented
      <Container style={{ marginBottom: 20 }}>
        <Row>
          <Col>
            <Card>
              <Card.Img
                variant='top'
                src={movie.ImagePath}
                style={{ width: "16rem", height: "20rem" }}
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant='link'>
                  More details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    // return (
    //   <div
    //     className='movie-card'
    //     onClick={() => {
    //       onMovieClick(movie);
    //     }}
    //   >
    //     {movie.Title}
    //   </div>
    // );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired, //this might be ImagePath
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
