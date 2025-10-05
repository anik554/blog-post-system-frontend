import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query<IUser,Error,IUser>({
      query: () => ({
        url: "/user/me",
        method: "GET"
      }),
      providesTags:["USER"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags:["USER"]
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation,useUserInfoQuery } = authApi;
