/*
 *
 * FormPage actions
 *
 */

import {
  GET_FORM,
  GET_FORM_SUCCEED,
  CHANGE_FORM_ORDER,
  DELETE_QUESTION,
  SEND_FORM,
  QUESTION_ERROR,
  ANSWER_QUESTION,
} from './constants';

export function getForm(formName) {
  return {
    type: GET_FORM,
    formName,
  };
}

export function answerQuestion(id, answer) {
  return {
    type: ANSWER_QUESTION,
    id,
    answer,
  };
}

export function errorQuestionHandler() {
  return {
    type: QUESTION_ERROR,
  };
}

export function sendForm(form, name) {
  return {
    type: SEND_FORM,
    form,
    name,
  };
}

export function changeQuestionOrder(oldIndex, newIndex) {
  return {
    type: CHANGE_FORM_ORDER,
    oldIndex,
    newIndex,
  };
}

export function getFormSucceed(form) {
  return {
    type: GET_FORM_SUCCEED,
    form,
  };
}

export function deleteQuestion(questionId) {
  return {
    type: DELETE_QUESTION,
    questionId,
  };
}
