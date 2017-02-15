import { takeEvery, put } from 'redux-saga/effects';
import { GET_FORM, GET_FORM_SUCCEED, SEND_FORM } from './constants';

// Individual exports for testing
export function* fetchForm({ formName }) {
  const response = yield fetch(`http://localhost:3000/api/${formName}`);
  const form = yield response.json();
  yield put({ type: GET_FORM_SUCCEED, form });
}

export function* sendForm({ form, name }) {
  const response = yield fetch(`http://localhost:3000/api/${name}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  yield response.json();
}

export function* watchGetForm() {
  yield takeEvery(GET_FORM, fetchForm);
}

export function* watchSendForm() {
  yield takeEvery(SEND_FORM, sendForm);
}

// All sagas to be loaded
export default [
  watchGetForm,
  watchSendForm,
];
