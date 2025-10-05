import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/icons";

// Sample data types
type Post = {
  id: string;
  sn: string;
  title: string;
  status: "Published" | "Draft" | "Scheduled";
  views: string;
  date: string;
  author: string;
};

const samplePosts: Post[] = [
  {
    id: "1",
    sn: "01",
    title: "How AI Is Changing The Future Of Travel",
    status: "Published",
    views: "4,532",
    date: "February 9, 2015",
    author: "Marvin McKinney",
  },
  {
    id: "2",
    sn: "02",
    title: "10 Easy Vegan Recipes For Busy People",
    status: "Draft",
    views: "4,532",
    date: "November 7, 2017",
    author: "Theresa Webb",
  },
  {
    id: "3",
    sn: "03",
    title: "Best Budget Destinations For 2025",
    status: "Draft",
    views: "4,532",
    date: "March 23, 2013",
    author: "Jane Cooper",
  },
  {
    id: "4",
    sn: "04",
    title: "10 Easy Vegan Recipes For Busy People",
    status: "Published",
    views: "4,532",
    date: "May 31, 2015",
    author: "Robert Fox",
  },
];

export default function AdminHome() {
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
                <div className="text-3xl font-bold">128</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent posts table */}
          <section className="w-10/12 mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Recent Posts</h2>
              <Button variant="ghost">See All</Button>
            </div>

            <div className="bg-white rounded-lg border border-slate-100 shadow-sm">
              <table className="w-full table-auto">
                <thead className="bg-slate-50">
                  <tr className="text-sm text-slate-500">
                    <th className="p-4 text-left">S/N</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Views</th>
                    <th className="p-4 text-left">Date Published</th>
                    <th className="p-4 text-left">Author</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePosts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-4 text-sm text-slate-500 w-16">
                        {p.sn}
                      </td>
                      <td className="p-4 text-sm">{p.title}</td>
                      <td className="p-4 text-sm">
                        <span
                          className={`text-sm font-medium ${
                            p.status === "Published"
                              ? "text-emerald-600"
                              : p.status === "Draft"
                              ? "text-violet-600"
                              : "text-amber-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{p.views}</td>
                      <td className="p-4 text-sm">{p.date}</td>
                      <td className="p-4 text-sm">{p.author}</td>
                      <td className="p-4 text-sm w-36 flex gap-3">
                        <button className="p-2 rounded border border-slate-100 hover:bg-slate-50">
                          {/* <Icons.edit className="w-4 h-4" /> */}
                        </button>
                        <button className="p-2 rounded border border-slate-100 hover:bg-slate-50">
                          {/* <Icons.trash className="w-4 h-4" /> */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

