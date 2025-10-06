import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAllPostsQuery } from "@/redux/features/post/post.api";
import { Spinner } from "@/components/ui/spinner";
import { getCatNameById } from "@/utils/getCatById";
import { getUserNameById } from "@/utils/getnameById";
import { useAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IPost } from "@/types/post.type";

export default function AdminHome() {
  const { data: posts, isLoading } = useAllPostsQuery(undefined);
  const { data: categories } = useAllCategoriesQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1">
          {/* Top stats */}
          <div className="w-4/12 mx-auto py-5">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-amber-50">
                      {/* <Icons.document className="w-5 h-5 text-amber-600" /> */}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-700">
                        Total Posts
                      </h3>
                      <p className="text-xs text-slate-400">Lifetime</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{posts?.meta?.total}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent posts table */}
          <section className="w-10/12 mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Recent Posts</h2>
              <Button variant="ghost">See All</Button>
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
                        <td className="border px-4 py-2">
                          {post.meta_description}
                        </td>
                        <td className="border px-4 py-2">
                          {post.blog_content}
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
          </section>
        </main>
      </div>
    </div>
  );
}
