// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, DELETE_USER, SET_FAVORITE, DELETE_FAVORITE } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
        console.log('SET_MOVIES reducer reached')
      return action.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
    switch (action.type) {
      case SET_USER:
        console.log('SET_User reducer reached')
        return action.value;
      case UPDATE_USER:
        return action.value;
      case DELETE_USER:
        return action.value;
      case SET_FAVORITE:
        return {
          ...state,
          FavoriteMovies: [
            ...state?.FavoriteMovies,
            action.value,
          ],
        };
      case DELETE_FAVORITE:
        return {
          ...state,
          FavoriteMovies: [
            ...state?.FavoriteMovies.filter(
              (movieId) => movieId !== action.value
            ),
          ],
        };
      default:
        return state;
    }
  }

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

//same as above
// function moviesApp(state = {}, action) {
//     return {
//       visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//       movies: movies(state.movies, action)
//     }
//   }

export default moviesApp;