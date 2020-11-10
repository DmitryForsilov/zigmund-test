import { companiesActions, companiesReducer } from './companies';
import { reposActions, reposReducer } from './repos';

export const actions = {
  ...companiesActions,
  ...reposActions,
};

export const reducers = {
  companies: companiesReducer,
  repos: reposReducer,
};
