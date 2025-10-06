import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAllCategoriesQuery } from "@/redux/features/category/category.api";
import {
  useAllPostsQuery,
  useDeletePostMutation,
} from "@/redux/features/post/post.api";
import type { IPost } from "@/types/post.type";
import { getCatNameById } from "@/utils/getCatById";
import { getUserNameById } from "@/utils/getnameById";
import { useNavigate } from "react-router";

const Posts = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useAllPostsQuery(undefined);
  const [deletePost] = useDeletePostMutation();
  const { data: categories } = useAllCategoriesQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);
  const handleDeletePost = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deletePost(id).unwrap();
    } catch (error) {
      console.error("Failed to delete Post:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Posts</h2>
        <Button onClick={() => navigate("/admin/create")}>Add Post</Button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">SN</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Publish Date</th>
              <th className="border px-4 py-2">Tags</th>
              <th className="border px-4 py-2">Meta Description</th>
              <th className="border px-4 py-2">Blog Content</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading categories...
                </td>
              </tr>
            ) : posts?.data?.length ? (
              posts.data.map((post: IPost, index: number) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">
                    {getCatNameById(categories?.data, post.category)}
                  </td>
                  <td className="border px-4 py-2">
                    {getUserNameById(userInfo?.data, post.author)}
                  </td>
                  <td className="border px-4 py-2">{post.publish_on}</td>
                  <td className="border px-4 py-2">{post.tags}</td>
                  <td className="border px-4 py-2">{post.meta_description}</td>
                  <td className="border px-4 py-2">{post.blog_content}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
