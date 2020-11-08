/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    reposByCompanyId: {},
    uiState: {
      currentPaginationPageByCompanyId: {},
    },
    allIds: [],
  },
  reducers: {
    getReposSuccess(state, { payload: { repos, companyId } }) {
      state.reposByCompanyId[companyId] = repos;
      state.uiState.currentPaginationPageByCompanyId[companyId] = 1;
      state.allIds.push(companyId);
    },
    setReposPaginationPage(state, { payload: { companyId, pageNumber } }) {
      state.uiState.currentPaginationPageByCompanyId[companyId] = pageNumber;
    },
  },
});

export const reposActions = {
  ...reposSlice.actions,
};

export const reposReducer = reposSlice.reducer;
