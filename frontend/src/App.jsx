import "./style/homepage.css";
import Header from "./components/HomePage/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/silders/SideBar.jsx";
import ToastProvider from "./components/modals/ToastProvider.jsx";
import GlobalErrorHandler from "./components/modals/GlobalErrorHandler.jsx";

function App() {
  return (
    <>
      <ToastProvider />
      <GlobalErrorHandler />
        <section className="yutub-home">
          <Sidebar />
          <header>
            <Header />
          </header>
          <Outlet />
        </section>
    </>
  );
}

export default App;
