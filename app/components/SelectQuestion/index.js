/**
*
* SelectQuestion
*
*/

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';


function SelectQuestion(props) {
  const answers = props.answers.map((answer, index) => <option key={index} value={answer}>{answer}</option>);
  return (
    <FormControl componentClass="select" onChange={(e) => props.onAnswerChange(props.id, e.target.value)}>
      {answers}
    </FormControl>
  );
}

SelectQuestion.propTypes = {
  answers: PropTypes.array.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default SelectQuestion;
