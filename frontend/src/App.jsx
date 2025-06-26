import "./style/homepage.css";
import { useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage.jsx";
import Header from "./components/HomePage/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/silders/SideBar.jsx";

function App() {
  const authStatus = useSelector((state) => state.auth.status);
  // const [sortDir, setSortDir] = useState(false);
  // const [page,setPage] = useState(1);

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: value }));
  //   setPage(1);
  // };

  return (
    <>
      {authStatus && (
        <section className="yutub-home">
            <Sidebar/>
          <header>
            <Header />
          </header>
          <Outlet />
        </section>
      )}
      {!authStatus && <LandingPage />}
    </>
  )
}

export default App
