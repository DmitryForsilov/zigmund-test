/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-ignore
import formActionSaga from 'redux-form-saga';
import {
  takeEvery, call, put, all,
} from 'redux-saga/effects';
import _ from 'lodash';
import { SubmissionError } from 'redux-form';
import actions from '../actions';
import api from '../../api/index';

interface IFetchReposWorkerArgs {
  payload: {
    name: string,
    reset: () => void
  }
}

function* fetchReposWorker({ payload }: IFetchReposWorkerArgs) {
  const { name, reset } = payload;

  try {
    const { data } = yield call(api.fetchRepos, name);
    const company = { name, id: Number(_.uniqueId()) };

    yield put(actions.fetchRepos.success());
    yield put(actions.downloadRepos({ repos: data, company }));
    reset();
  } catch (error) {
    const formError = new SubmissionError({ _error: error.message });

    yield put(actions.fetchRepos.failure(formError));
  }
}

function* sagaReposWatcher() {
  yield takeEvery(actions.fetchRepos.REQUEST, fetchReposWorker);
}

export default function* rootSaga() {
  yield all([
    sagaReposWatcher(),
    formActionSaga(),
  ]);
}
