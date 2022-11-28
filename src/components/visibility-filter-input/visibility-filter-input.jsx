// src/components/visibility-filter-input/visibility-filter-input.jsx
import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';




import { setFilter } from '../../actions/actions';

import "./visibility-filter.scss";

function VisibilityFilterInput(props) {
  return <Form.Control className='search-filter'
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="search movies"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);