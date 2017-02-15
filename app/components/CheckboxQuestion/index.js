/**
*
* CheckboxQuestion
*
*/

import React, { PropTypes } from 'react';

export class CheckboxQuestion extends React.Component {
  constructor(props) {
    super();
    this.result = [];
    this.questionId = props.id;
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.answers = props.answers.map((answer, index) => (
      <li className="list-element" key={index}>
        <input type="checkbox" value={answer} onChange={(e) => this.onCheckboxClick(e.target.value, e.target.checked)} />{answer}
      </li>
    ));
    this.onAnswerChange = props.onAnswerChange;
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
    this.onAnswerChange(this.questionId, this.result);
  }

  render() {
    return (
      <ul>
        {this.answers}
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
