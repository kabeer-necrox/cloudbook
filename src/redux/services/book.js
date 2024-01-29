import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => "books",
    }),
    getBook: builder.query({
      query: (params) => `books/${params.id}`,
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `books/${data.id}`,
        method: "PUT",
        body: data.book,
      }),
    }),
  }),
});

export const {
  useLazyGetBooksQuery,
  useLazyGetBookQuery,
  useUpdateBookMutation,
} = bookApi;
