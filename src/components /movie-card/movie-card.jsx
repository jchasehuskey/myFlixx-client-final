import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      //container, row, and col -> may not be absolutely necessary.  Not sure if I like it before all was implemented

      <Container className='card-container' style={{ marginBottom: 20 }}>
        <Row>
          <Col>
            <Card className='movie-card'>
              <Card.Img
                className='card-img'
                variant='top'
                src={movie.ImagePath}
                // style={{ width: "100%", height: "24rem" }}
                // style={{ width: "100%" }}
              />
              <Card.Body
                className='card-body'
                // className='overflow-hidden'
                style={{ height: "10rem" }}
              >
                <Card.Title className='card-title-name'>
                  {movie.Title}
                </Card.Title>
                <Card.Text className='description'>
                  {movie.Description}
                </Card.Text>
                <Button
                  className='card-button'
                  onClick={() => onMovieClick(movie)}
                  variant='link'
                >
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
