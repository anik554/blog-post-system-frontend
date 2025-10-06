import { baseApi } from "@/redux/baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comment/create",
        method: "POST",
        data: commentData,
      }),
      invalidatesTags: ["COMMENT"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COMMENT"],
    }),
    allComment: builder.query({
      query: () => ({
        url: "/comment",
        method: "GET",
      }),
      providesTags: ["COMMENT"],
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["COMMENT"],
    }),
  }),
});

export const {
  useAllCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} = commentApi;
