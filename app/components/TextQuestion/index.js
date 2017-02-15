/**
*
* TextQuestion
*
*/

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';


function TextQuestion(props) {
  return (
    <FormControl componentClass="textarea" onChange={(e) => props.onAnswerChange(props.id, e.target.value)}></FormControl>
  );
}

TextQuestion.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default TextQuestion;
