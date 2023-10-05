import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Circuits from "./pages/Circuits";
import Drivers from "./pages/Drivers";
import Constructors from "./pages/Constructors";
import Results from "./pages/Results";
import Plots from "./pages/Plots";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "/app/dashboard", element: <Dashboard /> },
      { path: "/app/circuits", element: <Circuits /> },
      { path: "/app/drivers", element: <Drivers /> },
      { path: "/app/constructors", element: <Constructors /> },
      { path: "/app/results", element: <Results /> },
      { path: "/app/plots", element: <Plots /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
