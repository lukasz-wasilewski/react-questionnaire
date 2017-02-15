/**
*
* DateQuestion
*
*/

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';


function DateQuestion(props) {
  return (
    <FormControl type="date" onChange={(e) => props.onAnswerChange(props.id, e.target.value)} />
  );
}

DateQuestion.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default DateQuestion;
