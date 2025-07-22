import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/store.js";
import Page404 from "./pages/Page404.jsx";
import TermsandCondition from "./pages/Terms-and-Condition.jsx";
import Polices from "./pages/Polices.jsx";
import Profile from "./pages/ProfilePage.jsx";
import PlaylistPage from "./pages/PlaylistPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Auth from "./pages/Auth.jsx";
import LoginComponent from "./components/auth/LoginComponent.jsx";
import SignupComponent from "./components/auth/SignupComponent.jsx";
import { PersistGate } from "redux-persist/integration/react";
import VideoPage from "./pages/VideoPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import Playlists from "./pages/Playlists.jsx";
import WatchHistoryPage from "./pages/WatchHistoryPage.jsx";
import LikedVideosPage from "./pages/LikedVideosPage.jsx";

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
        path: "/videos",
        element: (
            <VideoPage />
        ),
      },
      {
        path: "/videos/playlist",
        element : (
          <Playlists />
        )
      },
      {
        path : "/videos/playlist/:id",
        element : (
          <PlaylistPage/>
        )
      },
      {
        path : "/videos/watchhistory",
        element: <WatchHistoryPage/>
      },
      {
        path : "/videos/liked",
        element: <LikedVideosPage />
      },
      {
        path: "/photos",
        element: (
            <PhotoPage />
        ),
      },
      {
        path: "posts",
        element: (
            <PostPage />
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <VideoPlayerPage />
        ),
      },
      {
        path: "/playlist/:id",
        element: (
          <ProtectedRoute>
            <PlaylistPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "signup",
        element: <SignupComponent />,
      },
    ],
  },

  {
    path: "/termsandcondition",
    element: <TermsandCondition />,
  },
  {
    path: "/privacypolicy",
    element: <Polices />,
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
