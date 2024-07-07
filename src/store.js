import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import bookReducer from './features/bookSlice';
import requestReducer from './features/requestSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: bookReducer,
    requests: requestReducer,
  },
});
