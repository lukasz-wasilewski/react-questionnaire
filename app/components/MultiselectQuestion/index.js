/**
*
* MultiselectQuestion
*
*/

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';


export class MultiselectQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const options = e.target.options;
    const result = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        result.push(options[i].value);
      }
    }
    this.props.onAnswerChange(this.props.id, result);
  }

  render() {
    const answers = this.props.answers.map((answer, index) => <option key={index} value={answer}>{answer}</option>);
    return (
      <FormControl componentClass="select" multiple onChange={this.onChange}>
        {answers}
      </FormControl>
    );
  }
}

MultiselectQuestion.propTypes = {
  onAnswerChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
};

export default MultiselectQuestion;
