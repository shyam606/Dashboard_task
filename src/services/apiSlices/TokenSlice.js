import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tokenSlice = createApi({
    reducerPath: "token_apis",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://uat-test.aiiongold.com/api/",
        prepareHeaders: (headers) => {
            headers.set("x-api-key", "AIzaSyAxsCahMywG27JQz76amLWLHEUXr7a5MyI");
            return headers;
          },
    }),
    tagTypes:['Token'],
    endpoints: (builder) => ({
        getTokenData: builder.mutation({
            query: (data) => ({
                url: "token_screen",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Token']
        }),
        buyCoins: builder.mutation({
            query: (data) => ({
                url: "buy_coins",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['token_price']
        }),
    }),
});

// Export hooks for usage in components
export const { useGetTokenDataMutation,useBuyCoinsMutation } = tokenSlice;
