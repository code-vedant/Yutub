import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useDimension from "../../hooks/useDimension";
import { useState } from "react";
import alien from "../../assets/alien.jpeg"

function Header() {
  const user = useSelector((state) => state.auth.userData);
  const [openSearch, setOpenSearch] = useState(false);
  const { width } = useDimension();

  const handleSearchOpen = () => {
    setOpenSearch(!openSearch)
  }

  return (
    <>
      <nav className="home-header">
        <Link to={"/"} className="home-header-title">
          Yutub<span>2.0 - under-development</span>
        </Link>
        <section className="home-search-button-mobile">
          <FaSearch onClick={handleSearchOpen} className="search-icon" />
          {openSearch && <section className="home-header-search-mobile">
            <input type="text" placeholder="Search here...." />
            <FaSearch className="search-icon" />
          </section>}
        </section>
        {width > 450 && (
          <section className="home-header-search">
            <input type="text" placeholder="Search here...." />
            <FaSearch className="search-icon" />
          </section>
        )}
        <section className="home-header-profile">
          <Link to={"/profile"} className="home-header-user">
            <img src={user?.avatar  || alien } />
          </Link>
        </section>
      </nav>
    </>
  );
}

export default Header;
