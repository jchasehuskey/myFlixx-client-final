import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className='movie-view'>
        <Row>
          <Col className='movie-poster d-flex justify-content-center'>
            <img className='movie-img s' src={movie.ImagePath} />
          </Col>
          <Col>
            <div className='movie-title label value'>Title: {movie.Title}</div>
            <div className='description-keyword' label>
              Description:
            </div>
            <div className='movie-description  value'>{movie.Description}</div>
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
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
