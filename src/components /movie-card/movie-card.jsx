import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "./movie-card.scss";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      //container, row, and col -> may not be absolutely necessary.  Not sure if I like it before all was implemented

      <Container className='card-container'>
        <Row>
          <Col>
            <Card className='movie-card'>
              <Card.Img
                className='card-img'
                variant='top'
                src={movie.ImagePath}
              />
              <Card.Body
                className='card-body'
                //keep style below inline, bug if taken out

                style={{ height: "10rem" }}
              >
                <Card.Title className='card-title-name'>
                  {movie.Title}
                </Card.Title>
                <Card.Text className='description'>
                  {movie.Description}
                </Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className='card-button' variant='link'>
                    More info
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // ImageURL: PropTypes.string.isRequired, //this might need to be reinstated
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired,
};
