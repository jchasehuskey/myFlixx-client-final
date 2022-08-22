import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Col, Row, Card } from "react-bootstrap";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className='movie-view'>
        <Row>
          <Col className='movie-poster d-flex justify-content-center'>
            <img
              src={movie.ImagePath}
              style={{ width: "20rem", height: "24rem" }}
            />
          </Col>
        </Row>
        <Row className='movie-title'>
          <Col className='label'>Title: </Col>
          <Col className='value'>{movie.Title}</Col>
        </Row>

        <Row className='movie-description'>
          <Col className='label'>Description: </Col>
          <Col className='value'>{movie.Description}</Col>
        </Row>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
