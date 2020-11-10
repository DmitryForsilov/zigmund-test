/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './redux/reducers';
import rootSaga from './redux/sagas';

export default () => {
  const defaultMiddlewares = getDefaultMiddleware({
    thunk: false,
    immutableCheck: false,
    serializableCheck: false,
  });
  const sagaMiddleWare = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: defaultMiddlewares.concat(sagaMiddleWare),
  });

  sagaMiddleWare.run(rootSaga);

  return store;
};
