import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreatePost from "@/components/modules/posts/CreatePost";
import About from "@/pages/About";
import Login from "@/pages/Login";
import AdminHome from "@/pages/admin/AdminHome";
import Categories from "@/pages/admin/Categories";
import Comments from "@/pages/admin/Comments";
import Posts from "@/pages/admin/Posts";
import Users from "@/pages/admin/Users";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path:"/admin",
    children:[
        {
            Component: AdminHome,
            index:true
        },
        {
            Component: Posts,
            path:"posts"
        },
        {
            Component: CreatePost,
            path:"create"
        },
        {
            Component: Comments,
            path:"comments"
        },
        {
            Component: Users,
            path:"users"
        },
        {
            Component: Categories,
            path:"categories"
        },
    ]
  },
  {
    Component: Login,
    path:"/login"
  }
]);
