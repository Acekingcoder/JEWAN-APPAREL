// import { apiSlice } from "./apiSlice";
// import { ORDERS_URL } from "../constant";
// import { CREATE_ORDERS_URL } from "../constant";

// const userInfo = localStorage.getItem("userInfo");

// const user = JSON.parse(userInfo);
// const { token } = user;

// export const ordersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: ORDERS_URL,
//         method: "POST",
//         Authorization: `Bearer ${token}`,
//         body: { ...order },
//       }),
//     }),
//   }),
// });

// export const { useCreateOrderMutation } = ordersApiSlice;

import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constant";
import { CREATE_ORDERS_URL } from "../constant";

const userInfo = localStorage.getItem("userInfo");
const user = JSON.parse(userInfo);
const token = user?.token;

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      // Set the Authorization header here
      onBeforeQuery: (query) => {
        if (token) {
          query.headers["Authorization"] = `Bearer ${token}`;
        }
        return query;
      },
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
