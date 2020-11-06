/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const reposSlice = createSlice({
  name: 'repos',
  initialState: {},
  reducers: {
    getReposSuccess(state, { payload: { repos, companyId } }) {
      state[companyId] = repos;
    },
  },
});

export const reposActions = {
  ...reposSlice.actions,
};

export const reposReducer = reposSlice.reducer;
