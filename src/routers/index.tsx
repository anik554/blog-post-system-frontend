import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Posts from "@/pages/Posts";
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
    Component: AdminLayout,
    path:"/admin",
    children:[
        {
            Component: Posts,
            path:"posts"
        }
    ]
  },
  {
    Component: Login,
    path:"/login"
  }
]);
