import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store,  persistor } from "./store/store.js";
import HomePage from "./pages/HomePage.jsx";
import Page404 from "./pages/Page404.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TermsandCondition from "./pages/Terms-and-Condition.jsx";
import Polices from "./pages/Polices.jsx";
import SelfProfile from "./pages/SelfProfile.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./pages/About.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Auth from "./pages/Auth.jsx";
import LoginComponent from "./components/auth/LoginComponent.jsx";
import SignupComponent from "./components/auth/SignupComponent.jsx";
import { PersistGate } from "redux-persist/integration/react";

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
    path: "/landingPage",
    element: <LandingPage/>
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path:"login",
        element: <LoginComponent />
      },
      {
        path:"signup",
        element: <SignupComponent />
      }
    ]
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
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
