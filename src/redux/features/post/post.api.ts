import { baseApi } from "@/redux/baseApi";
import type { IPost } from "@/types/post.type";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/post/create",
        method: "POST",
        data: postData,
      }),
      invalidatesTags: ["POST"],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),
    allPosts: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
      providesTags: ["POST"],
    }),
    updatePost: builder.mutation({
      query: ({ id, postData }: { id: string; postData: Partial<IPost> }) => ({
        url: `/post/${id}`,
        method: "PATCH",
        data: postData,
      }),
      invalidatesTags: ["POST"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useAllPostsQuery,
  useUpdatePostMutation,
} = postApi;
