import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "graph_apis",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aiiongold.com/api/",
    prepareHeaders: (headers) => {
      headers.set("x-api-key", "AIzaSyAxsCahMywG27JQz76amLWLHEUXr7a5MyI");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGoldPrice: builder.query({
      query: ({ params }) => {
        const queryParams = new URLSearchParams(params).toString();
        return `gold-prices?${queryParams}`
      },
      providesTags: ['gold_price']
    }),
    getTokenGraphPrice: builder.query({
      query: ({params}) => {
        // const queryParams = new URLSearchParams(params).toString();
        console.log('queryParams',params);
        
        return `Tokenprice?user_id=${params?.user_id}`
      },
      providesTags: ['token_price']
    }),
  }),
});

// Export hooks for usage in components
export const { useGetGoldPriceQuery, useGetTokenGraphPriceQuery } = apiSlice;
