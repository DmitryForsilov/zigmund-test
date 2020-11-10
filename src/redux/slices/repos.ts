/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDownloadRepos {
  company: { name: string, id: number },
  repos: any[]
}

interface IInitialState {
  reposByCompanyId: {
    [id: number]: any,
  },
  uiState: {
    currentPaginationPageByCompanyId: {
      [id: number]: number,
    },
  },
  allIds: number[]
}

const initialState: IInitialState = {
  reposByCompanyId: {},
  uiState: {
    currentPaginationPageByCompanyId: {},
  },
  allIds: [],
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    downloadRepos(state, action: PayloadAction<IDownloadRepos>) {
      const { repos, company } = action.payload;

      state.reposByCompanyId[company.id] = repos;
      state.uiState.currentPaginationPageByCompanyId[company.id] = 1;
      state.allIds.push(company.id);
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
