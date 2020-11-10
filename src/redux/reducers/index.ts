import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { reducers } from '../slices';

export const rootReducer = combineReducers({ ...reducers, form: formReducer });
export type RootState = ReturnType<typeof rootReducer>;
