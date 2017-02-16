/**
*
* CheckboxQuestion
*
*/

import React, { PropTypes } from 'react';

export class CheckboxQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.result = [];
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  onCheckboxClick(value, checked) {
    if (checked) {
      this.result.push(value);
    } else {
      const index = this.result.indexOf(value);
      if (index > -1) {
        this.result.splice(index, 1);
      }
    }
    this.props.onAnswerChange(this.props.id, this.result);
  }

  render() {
    const answers = this.props.answers.map((answer, index) => (
      <li className="list-element" key={index}>
        <input type="checkbox" value={answer} onChange={(e) => this.onCheckboxClick(e.target.value, e.target.checked)} /> {answer}
      </li>
    ));
    return (
      <ul>
        {answers}
      </ul>
    );
  }
}

CheckboxQuestion.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};

export default CheckboxQuestion;
