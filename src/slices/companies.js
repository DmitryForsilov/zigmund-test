/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    companiesList: [],
    currentCompanyId: null,
  },
  reducers: {
    getCompanySuccess(state, { payload: { company } }) {
      state.companiesList.push(company);
    },
    setCurretnCompanyId(state, { payload: { companyId } }) {
      state.currentCompanyId = companyId;
    },
  },
});

const getCompany = async ({ companyName }) => {
  const url = `https://api.github.com/orgs/${companyName}/repos`;
  const response = await axios.get(url);

  return response;
};

export const companiesActions = {
  ...companiesSlice.actions,
  getCompany,
};

export const companiesReducer = companiesSlice.reducer;
