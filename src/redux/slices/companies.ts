/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reposActions } from './repos';

interface IInitialState {
  companiesById: {
    [id: number]: any,
  },
  currentCompanyId: number | null
  allIds: number[]
}

interface IDownloadRepos {
  company: { name: string, id: number }
}

interface ISetCurrentCompanyId {
  companyId: number
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
    setCurrentCompanyId(state, action: PayloadAction<ISetCurrentCompanyId>) {
      const { companyId } = action.payload;

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
