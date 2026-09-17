import {
  configureStore,
  combineReducers,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commonReducer from './features/common';
import authReducer from './features/auth.slice';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return !__IS_PRODUCTION__
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware();
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export * from './features/common';
export * from './features/auth.slice';
