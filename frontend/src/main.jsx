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
import Posts from "./pages/Posts.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import Playlists from "./pages/Playlists.jsx";
import WatchHistoryPage from "./pages/WatchHistoryPage.jsx";
import LikedVideosPage from "./pages/LikedVideosPage.jsx";
import LikedPostsPage from "./pages/LikedPostsPage.jsx";
import LikedPhotosPage from "./pages/LikedPhotosPage.jsx";
import Collections from "./pages/Collections.jsx";
import PopupHolder from "./components/PopupHolder.jsx";
import PhotoDetails from "./pages/PhotoDetails.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

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
        path: "/photos/:id",
        element: (
            <PopupHolder>
              <PhotoDetails/>
            </PopupHolder>
        ),
      },
      {
        path: "/photos/liked",
        element: (
            <ProtectedRoute>
              <LikedPhotosPage />
            </ProtectedRoute>
        ),
      },
      {
        path: "/photos/collections",
        element: (
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
        ),
      },
      {
        path: "/photos/collections/:id",
        element: (
            <ProtectedRoute>
              <CollectionPage />
            </ProtectedRoute>
        ),
      },
      {
        path: "posts",
        element: (
            <Posts />
        ),
      },
      {
        path: "post/:id",
        element: (
            <PostPage />
        ),
      },
      {
        path: "/posts/liked",
        element: (
            <ProtectedRoute>
              <LikedPostsPage />
            </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
            <Profile />
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
      {
        path : "/search",
        element : <SearchPage />
      },
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
