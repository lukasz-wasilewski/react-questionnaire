/**
*
* RadioQuestion
*
*/

import React, { PropTypes } from 'react';

export class RadioQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { selected: '' };
  }

  onChange(e) {
    this.setState({ selected: e.target.value });
    this.props.onAnswerChange(this.props.id, e.target.value);
  }

  render() {
    const answers = this.props.answers.map((answer, index) => (
      <li className="list-element" key={index}>
        <input type="radio" onChange={this.onChange} value={answer} checked={this.state.selected === answer} />
        {answer}
      </li>
    ));
    return (
      <ul>
        {answers}
      </ul>
    );
  }
}

RadioQuestion.propTypes = {
  answers: PropTypes.array.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default RadioQuestion;
