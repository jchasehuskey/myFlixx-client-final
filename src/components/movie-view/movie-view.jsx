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

} from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import React, {useState} from "react";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, isFavorite, handleFavorite , addFavorite, favoriteMovies, show, toggleShow} = this.props;

    // let buttonToggle=document.querySelector('toggle');
    // buttonToggle.addEventListener('click', function (){
    //   buttonToggle.classlist.add('.button-toggle')
    // });


    const Toggle = () => {
      const [show, toggleShow] = React.useState(true);

      <div>
      <button
        onClick={() => toggleShow(!show)}
      >
        toggle: {show ? 'show' : 'hide'}
      </button>    
      {show && <div>Hi there</div>}
      </div>
    
      // return (
      //   <div>
      //     <button
      //       onClick={() => toggleShow(!show)}
      //     >
      //       toggle: {show ? 'show' : 'hide'}
      //     </button>    
      //     {show && <div>Hi there</div>}
      //   </div>
      // )
    }







    return (
      <Container className='movie-view'>
        <Row>
          <Col className='movie-poster d-flex justify-content-center'>
            <img className='movie-img ' src={movie.ImagePath} />
          </Col>
          <Col>
            <div className='movie-title label value'>Title: {movie.Title}</div>
            {/* <Button
            className="button-movie-view-add-favorite"
            variant="outline-warning"
            size="sm"
            type="button"
            onClick={() => addFavorite(movie._id)}
            
          >
            Add to favorites
          </Button> */}
      
            <div className='description-keyword' label>
              Description:
            </div>
            <div className='movie-description  value'>{movie.Description}</div>

            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant='link'>Director</Button>
            </Link>

            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant='link'>Genre</Button>
            </Link>
            {/* <Button onClick={goBack}> Back</Button> */}
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>

      
            {!isFavorite?(
              <Button
                    className="my-4 ml-2"
                    variant="outline-primary toggle"
                    // onClick={() => handleFavorite(movie._id, 'add')}
                    onClick={() => addFavorite(movie._id, 'add')}
                    // onClick={() => addFavorite(movie._id)}
                  >
                    add to favorites
              </Button>

            ):(
              <div/>
            )
          }

          {/* originial code below to add favorites */}
             {/* <Button
            className="button-movie-view-add-favorite"
            variant="outline-warning"
            size="sm"
            type="button"
            onClick={() => addFavorite(movie._id)}
            
          >
            Add to favorites
          </Button> */}
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
