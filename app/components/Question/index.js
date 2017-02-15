/**
*
* Question
*
*/

import React, { PropTypes } from 'react';
import CheckboxComponent from '../CheckboxQuestion';
import TextComponent from '../TextQuestion';
import RadioComponent from '../RadioQuestion';
import SelectComponent from '../SelectQuestion';
import MultiselectComponent from '../MultiselectQuestion';
import DateComponent from '../DateQuestion';
import NumberComponent from '../NumberQuestion';
import './styles.scss';

function Question(props) {
  let component;
  switch (props.type) {
    case 'checkbox':
      component = <CheckboxComponent {...props} />;
      break;
    case 'date':
      component = <DateComponent {...props} />;
      break;
    case 'multiselect':
      component = <MultiselectComponent {...props} />;
      break;
    case 'select':
      component = <SelectComponent {...props} />;
      break;
    case 'number':
      component = <NumberComponent {...props} />;
      break;
    case 'radio':
      component = <RadioComponent {...props} />;
      break;
    default:
      component = <TextComponent {...props} />;
      break;
  }
  const errorClass = props.error ? 'error' : '';
  return (
    <div className={`question-container ${errorClass}`}>
      <div>
        <h4>{ props.question }</h4>
        <button className="close-button" onClick={() => props.onDelete(props.id)}>&#10006;</button>
      </div>
      { component }
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Question;
