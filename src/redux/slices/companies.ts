/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reposActions } from './repos';

interface IDownloadRepos {
  company: { name: string, id: number }
}

interface IInitialState {
  companiesById: {
    [id: number]: any,
  },
  currentCompanyId: number | null
  allIds: number[]
}

const initialState: IInitialState = {
  companiesById: {},
  currentCompanyId: null,
  allIds: [],
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCurrentCompanyId(state, { payload: { companyId } }) {
      state.currentCompanyId = companyId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        reposActions.downloadRepos, (state, action: PayloadAction<IDownloadRepos>) => {
          const { company } = action.payload;

          state.companiesById[company.id] = company;
          state.allIds.push(company.id);
        },
      );
  },
});

export const companiesActions = {
  ...companiesSlice.actions,
};

export const companiesReducer = companiesSlice.reducer;
