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
} from './constants';

export function getForm(formName) {
  return {
    type: GET_FORM,
    formName,
  };
}

export function errorQuestionHandler(id, ifError) {
  return {
    type: QUESTION_ERROR,
    id,
    ifError,
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
