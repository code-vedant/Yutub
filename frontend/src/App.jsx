import "./style/homepage.css";
import Header from "./components/HomePage/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/silders/SideBar.jsx";
import ToastProvider from "./components/modals/ToastProvider.jsx";
import GlobalErrorHandler from "./components/modals/GlobalErrorHandler.jsx";
import PhotoDetails from "./pages/PhotoDetails.jsx";
import PopupHolder from "./components/PopupHolder.jsx";

function App() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <ToastProvider />
      <GlobalErrorHandler />
      <section className="yutub-home">
        <Sidebar />
        <header>
          <Header />
        </header>

        <Outlet context={{ location: backgroundLocation || location }} />

        {backgroundLocation && location.pathname.startsWith("/photos/") && (
         <PopupHolder>
           <PhotoDetails />
         </PopupHolder>
        )}
      </section>
    </>
  );
}

export default App;
