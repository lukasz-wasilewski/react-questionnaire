/**
*
* CheckboxQuestion
*
*/

import React, { PropTypes } from 'react';

export class CheckboxQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: [] };
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  onCheckboxClick(value, checked) {
    let result = [];
    if (checked) {
      result = this.state.result.concat([value]);
    } else {
      result = this.state.result.filter((r) => r !== value);
    }
    this.props.onAnswerChange(this.props.id, result);
    this.setState({ result });
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
