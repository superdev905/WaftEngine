import { takeLatest, take, call, fork, put, select, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import Api from 'utils/Api';
import { makeSelectToken, makeSelectPage } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let pageNumber = "";
  if (action.payload) {
    pageNumber = `&page=${action.payload.page}&size=${
      action.payload.rowsPerPage
    }`;
  }
  yield call(Api.get(`role/role?${pageNumber}`, actions.loadAllSuccess, actions.loadAllFailure, token));
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(Api.get(`role/role/${action.payload}`, actions.loadOneSuccess, actions.loadOneFailure, token));
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/wt/role-manage'));
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const { ...data } = action.payload;
  yield fork(Api.post('role/role', actions.addEditSuccess, actions.addEditFailure, data, token));
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
}