/*
 *
 * FormPage reducer
 *
 */

import { fromJS } from 'immutable';
import { arrayMove } from 'react-sortable-hoc';
import _ from 'lodash';
import {
  GET_FORM_SUCCEED,
  CHANGE_FORM_ORDER,
  DELETE_QUESTION,
  QUESTION_ERROR,
  ANSWER_QUESTION,
} from './constants';

const initialState = fromJS({
  form: {
    name: '',
    questions: [],
  },
  answers: {},
});

function formPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FORM_SUCCEED:
      return state.set('form', action.form);
    case CHANGE_FORM_ORDER:
      return state.set('form', {
        ...state.toJS().form,
        questions: arrayMove(state.toJS().form.questions, action.oldIndex, action.newIndex),
      });
    case DELETE_QUESTION:
      return state.set('form', {
        ...state.toJS().form,
        questions: _.filter(state.toJS().form.questions, (q) => q.id !== action.questionId),
      });
    case QUESTION_ERROR:
      return state.set('form', {
        ...state.toJS().form,
        questions: _.map(state.toJS().form.questions, (q) => q.id === action.id ? { ...q, error: action.ifError } : q),
      });
    case ANSWER_QUESTION:
      return state.set('answers', {
        ...state.toJS().answers,
        [action.id]: {
          answer: action.answer,
          questionId: action.id,
        },
      });
    default:
      return state;
  }
}

export default formPageReducer;
