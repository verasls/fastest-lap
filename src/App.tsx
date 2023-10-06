import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Circuits from "./pages/Circuits";
import Drivers from "./pages/Drivers";
import Constructors from "./pages/Constructors";
import Results from "./pages/Results";
import Plots from "./pages/Plots";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
