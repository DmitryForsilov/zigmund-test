/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { createFormAction } from 'redux-form-saga';
import { actions } from '../slices';

const fetchRepos = createFormAction('fetchRepos');

export default {
  ...actions,
  fetchRepos,
};
