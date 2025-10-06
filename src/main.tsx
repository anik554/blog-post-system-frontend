import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import {Provider as ReduxProvider} from "react-redux"
import { Toaster } from "@/components/ui/sonner"
import { store } from "./redux/store";
import { ThemeProvider } from "./providers/theme.provider";
import { router } from "./routers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
