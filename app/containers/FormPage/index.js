/*
 *
 * FormPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button } from 'react-bootstrap';
import makeSelectFormPage from './selectors';
import { getForm, changeQuestionOrder, deleteQuestion, sendForm, errorQuestionHandler, answerQuestion } from './actions';
import './style.scss';
import QuestionComponent from '../../components/Question';

const SortableItem = SortableElement(({ value, onDelete, onAnswerChange }) => (
  <li className="list-element">
    <QuestionComponent onDelete={onDelete} {...value} onAnswerChange={onAnswerChange} />
  </li>
));

const SortableList = SortableContainer(({ items, onDelete, onAnswerChange }) => (
  <ul>
    {items.map((value, index) =>
      <SortableItem key={`item-${index}`} index={index} value={value} onDelete={onDelete} onAnswerChange={onAnswerChange} />
    )}
  </ul>
));

export class FormPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onFormSend = this.onFormSend.bind(this);
  }

  componentDidMount() {
    this.props.getHomeForm();
  }

  onFormSend() {
    let valid = true;
    this.props.errorQuestionHandler();
    this.props.FormPage.form.questions.forEach((question) => {
      if (!question.user_answer) {
        valid = false;
      }
    });
    if (valid) {
      this.props.sendForm(this.props.FormPage.form, this.props.FormPage.form.name);
    }
  }

  render() {
    return (
      <div className="container">
        <h2>{ this.props.FormPage.form.name }</h2>
        <SortableList
          onDelete={this.props.deleteQuestion}
          items={this.props.FormPage.form.questions}
          onSortEnd={this.props.onSortEnd}
          onAnswerChange={this.props.answerQuestion}
        />
        <Button onClick={this.onFormSend}>Send</Button>
      </div>
    );
  }
}

FormPage.propTypes = {
  getHomeForm: PropTypes.func.isRequired,
  FormPage: PropTypes.object.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  sendForm: PropTypes.func.isRequired,
  errorQuestionHandler: PropTypes.func.isRequired,
  answerQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  FormPage: makeSelectFormPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHomeForm: () => dispatch(getForm('home_form')),
    onSortEnd: ({ oldIndex, newIndex }) => dispatch(changeQuestionOrder(oldIndex, newIndex)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    sendForm: (form, name) => dispatch(sendForm(form, name)),
    errorQuestionHandler: () => dispatch(errorQuestionHandler()),
    answerQuestion: (id, answer) => dispatch(answerQuestion(id, answer)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
