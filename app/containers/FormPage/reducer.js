/*
 *
 * FormPage reducer
 *
 */

import { fromJS } from 'immutable';
import { arrayMove } from 'react-sortable-hoc';
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
});

function formPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FORM_SUCCEED:
      return state.updateIn(['form'], (form) => form.mergeDeep(action.form));
    case CHANGE_FORM_ORDER:
      return state.updateIn(['form', 'questions'], (questions) =>
        questions.mergeDeep(arrayMove(questions.toJS(), action.oldIndex, action.newIndex))
      );
    case DELETE_QUESTION:
      return state.updateIn(['form', 'questions'], (questions) =>
        questions.filter((q) => q.get('id') !== action.questionId)
      );
    case QUESTION_ERROR:
      return state.updateIn(['form', 'questions'], (questions) =>
        questions.map((q) => q.get('user_answer') ?
          q.merge({ error: false }) : q.merge({ error: true })),
      );
    case ANSWER_QUESTION:
      return state.updateIn(['form', 'questions'], (questions) =>
        questions.map((q) => q.get('id') === action.id ? q.merge({ user_answer: action.answer }) : q),
      );
    default:
      return state;
  }
}

export default formPageReducer;
