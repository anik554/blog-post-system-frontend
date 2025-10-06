import { baseApi } from "@/redux/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/category/create",
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags:["CATEGORY"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["CATEGORY"]
    }),
    allCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET"
      }),
      providesTags:["CATEGORY"]
    }),
  }),
});

export const {useAllCategoriesQuery,useCreateCategoryMutation,useDeleteCategoryMutation} = categoryApi;
