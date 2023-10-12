import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Circuits from "./pages/Circuits";
import Drivers from "./pages/Drivers";
import Constructors from "./pages/Constructors";
import Results from "./pages/Results";
import Plots from "./pages/Plots";
import { UserInfoProvider } from "./contexts/UserInfoContext/UserInfoProvider";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  {
    path: "app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "circuits", element: <Circuits /> },
      { path: "drivers", element: <Drivers /> },
      { path: "constructors", element: <Constructors /> },
      { path: "results", element: <Results /> },
      { path: "plots", element: <Plots /> },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <UserInfoProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserInfoProvider>
  );
}
