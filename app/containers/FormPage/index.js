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
import _ from 'lodash';
import makeSelectFormPage from './selectors';
import { getForm, changeQuestionOrder, deleteQuestion, sendForm, errorQuestionHandler } from './actions';
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
    this.answers = {};
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.onFormSend = this.onFormSend.bind(this);
  }

  componentDidMount() {
    this.props.getHomeForm();
  }

  onAnswerChange(questionId, answer) {
    this.answers[questionId] = { answer, questionId };
  }

  onFormSend() {
    let valid = true;
    this.props.FormPage.form.questions.forEach((question) => {
      if (!_.some(this.answers, (a) => a.questionId === question.id)) {
        valid = false;
        if (!question.error) {
          this.props.errorQuestionHandler(question.id, true);
        }
      } else if (question.error) {
        this.props.errorQuestionHandler(question.id, false);
      }
    });
    if (valid) {
      this.props.sendForm(this.answers, this.props.FormPage.form.name);
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
          onAnswerChange={this.onAnswerChange}
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
    errorQuestionHandler: (id, ifError) => dispatch(errorQuestionHandler(id, ifError)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
