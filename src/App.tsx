import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Constructors from "./pages/Constructors";
import Circuits from "./pages/Circuits";
import Results from "./pages/Results";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "drivers", element: <Drivers /> },
      { path: "constructors", element: <Constructors /> },
      { path: "circuits", element: <Circuits /> },
      { path: "results", element: <Results /> },
      { path: "about", element: <About /> },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
