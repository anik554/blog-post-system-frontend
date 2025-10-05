import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        data: userData,
      }),
      invalidatesTags:["ALLUSER"]
    }),
    allUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET"
      }),
      providesTags:["ALLUSER"]
    }),
  }),
});

export const {useAllUserQuery,useCreateUserMutation} = userApi;
