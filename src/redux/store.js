import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import bookReducer from "./slices/book";
import { authApi } from "./services/auth";
import { bookApi } from "./services/book";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(bookApi.middleware),
});
