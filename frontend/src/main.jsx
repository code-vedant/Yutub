import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import HomePage from "./pages/HomePage.jsx";
import Page404 from "./pages/Page404.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TermsandCondition from "./pages/Terms-and-Condition.jsx";
import Polices from "./pages/Polices.jsx";
import SelfProfile from "./pages/SelfProfile.jsx";
import VideoUploadModal from "./components/VideoUploadModal.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/", 
        element: <HomePage />,
      },
      {
        path: "/videopage/:id", 
        element:
        <ProtectedRoute>
          <VideoPlayerPage />
        </ProtectedRoute>
        
      },
      {
        path: "/profile/:id",
        element:<ProtectedRoute>
        <Profile />
      </ProtectedRoute>,
      },
      {
        path: "/profile",
        element:<ProtectedRoute>
        <SelfProfile />
      </ProtectedRoute>,
      },
      {
        path: "/playlist/:id",
        element:<ProtectedRoute>
        <PlaylistPage />
      </ProtectedRoute>
      },
      {
        path: "/about",
        element: <About/>
      }

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  }, 
  {
    path: "/dashboard",
    element: <ProtectedRoute>
    <Dashboard/>
  </ProtectedRoute>,
  },
  {
    path: "/termsandcondition",
    element: <TermsandCondition />
  },
  {
    path: "/privacypolicy",
    element: <Polices/>
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
