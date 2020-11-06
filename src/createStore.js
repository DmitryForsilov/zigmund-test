import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './slices/index.js';

export default () => configureStore({
  reducer: reducers,
  companies: [],
  repos: {},
});
