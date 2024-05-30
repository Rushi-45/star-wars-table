import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ResourceList from "./components/ResourceList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/list",
        element: (
          <ProtectedRoute>
            <ResourceList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/list/:name",
        element: (
          <ProtectedRoute>
            <CharacterDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
