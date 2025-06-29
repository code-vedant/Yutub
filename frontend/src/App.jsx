import "./style/homepage.css";
import { useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage.jsx";
import Header from "./components/HomePage/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/silders/SideBar.jsx";
import ToastProvider from "./components/modals/ToastProvider.jsx";
import GlobalErrorHandler from "./components/modals/GlobalErrorHandler.jsx";

function App() {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <>
      <ToastProvider />
      <GlobalErrorHandler />
      {authStatus && (
        <section className="yutub-home">
          <Sidebar />
          <header>
            <Header />
          </header>
          <Outlet />
        </section>
      )}
      {!authStatus && <LandingPage />}
    </>
  );
}

export default App;
