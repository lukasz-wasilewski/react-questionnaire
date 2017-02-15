/**
*
* NumberQuestion
*
*/

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';


function NumberQuestion(props) {
  return (
    <FormControl type="number" onChange={(e) => props.onAnswerChange(props.id, e.target.value)} />
  );
}

NumberQuestion.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default NumberQuestion;
