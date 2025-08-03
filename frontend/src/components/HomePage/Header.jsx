import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useDimension from "../../hooks/useDimension";
import { useState } from "react";
import alien from "../../assets/alien.jpeg"
import { useForm } from "react-hook-form";

function Header() {
  const user = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status)
  const [openSearch, setOpenSearch] = useState(false);
  const { width } = useDimension();

  const {register, handleSubmit} = useForm();

  const handleSearchOpen = () => {
    setOpenSearch(!openSearch)
  }

  const handleSearch = (data) => {
    try {
      if (data?.data.trim() === "") {
        return;
      }
      const searchQuery = data.data.trim().split(" ").join("-");
      window.location.href = `/search?q=${searchQuery}`;
    } catch (error) {
      console.error("Error in search functionality:", error);
    }
  }

  return (
    <>
      <nav className="home-header">
        <Link to={"/"} className="home-header-title">
          YUTUB<span>2.0</span>
        </Link>
        <section className="home-search-button-mobile">
          <FaSearch onClick={handleSearchOpen} className="search-icon" />
          {openSearch && 
          <form onSubmit={handleSubmit(handleSearch)} className="home-header-search-mobile">
            <input type="text" placeholder="Search here...." {...register("data")} />
            <button type="submit">
            <FaSearch className="search-icon" />
            </button>
          </form>}
        </section>
        {width > 450 && (
          <form onSubmit={handleSubmit(handleSearch)} className="home-header-search">
            <input type="text" placeholder="Search here...."  {...register("data")} />
            <button>
            <FaSearch className="search-icon" />
            </button>
          </form>
        )}
        <section className="home-header-profile">
          {authStatus ? <Link to={"/profile"} className="home-header-user">
            <img src={user?.avatar  || alien } />
          </Link> : <Link to={"/auth/login"} className="home-header-login">
            <button className="login-btn">Login</button>
          </Link>}
        </section>
      </nav>
    </>
  );
}

export default Header;
