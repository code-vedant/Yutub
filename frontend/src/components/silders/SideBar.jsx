import { useState } from "react";
import { motion } from "framer-motion";
import "../../style/sidebar.css";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import {
  MdOutlinePhotoSizeSelectActual,
  MdOutlineBookmarkAdded,
  MdOutlinePostAdd,
} from "react-icons/md";
import { RiPagesLine, RiPlayList2Fill } from "react-icons/ri";
import { IoImagesOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import LogoutBtn from "../LogoutBtn.jsx";
import { useSelector } from "react-redux";

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const ProtectedLink = ({ to, icon, label }) =>
    authStatus ? (
      <li>
        <Link to={to}>
          {icon}
          <span>{label}</span>
        </Link>
      </li>
    ) : (
      <li className="disabled-link">
        {icon}
        <span>{label}</span>
      </li>
    );

  return (
    <>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <TbLayoutSidebarRightExpandFilled />
        ) : (
          <TbLayoutSidebarLeftExpandFilled />
        )}
      </button>

      <motion.div
        className="sidebar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <Link to={"/"} className="menu-logo">
          YUTUB <span>2.0</span>
        </Link>
        <ul>
          <li>
            <Link to={"/videos"}>
              <GoVideo className="link-icon" />
              <span>Video</span>
            </Link>
          </li>
          <li>
            <Link to={"/photos"}>
              <MdOutlinePhotoSizeSelectActual className="link-icon" />
              <span>Photos</span>
            </Link>
          </li>
          <li>
            <Link to={"/posts"}>
              <RiPagesLine className="link-icon" />
              <span>Posts</span>
            </Link>
          </li>
          <div className="separator"></div>
          <h4>Videos</h4>
          <ProtectedLink
            to="/videos/watchhistory"
            icon={<LuHistory className="link-icon" />}
            label="History"
          />
          <ProtectedLink
            to="/videos/playlist"
            icon={<RiPlayList2Fill className="link-icon" />}
            label="Playlist"
          />
          <ProtectedLink
            to="/videos/liked"
            icon={<BiLike className="link-icon" />}
            label="Liked videos"
          />
          <div className="separator"></div>
          <h4>Photos</h4>
          <ProtectedLink
            to="/photos/liked"
            icon={<FaRegHeart className="link-icon" />}
            label="Liked"
          />
          <ProtectedLink
            to="/photos/collections"
            icon={<IoImagesOutline className="link-icon" />}
            label="Collections"
          />
          <div className="separator"></div>
          <h4>Posts</h4>
          <ProtectedLink
            to="/profile"
            icon={<MdOutlinePostAdd className="link-icon" />}
            label="Write"
          />
          <ProtectedLink
            to="/posts/liked"
            icon={<FaRegHeart className="link-icon" />}
            label="Liked"
          />
          <div className="separator"></div>
        </ul>
        <div className="extra-menu">
          <Link to={"/privacypolicy"} className="menu-create">
            <button className="create-btn">Policy</button>
          </Link>
          <Link to={"/termsandcondition"} className="menu-create">
            <button className="create-btn">Term and Conditions</button>
          </Link>
          <Link
            to={"https://vedantuekey.vercel.app/projects/web/yutub"}
            target="_blank"
            className="menu-create"
          >
            <button className="create-btn">About Project</button>
          </Link>
          <Link
            to={"https://vedantuekey.vercel.app/"}
            target="_blank"
            className="menu-create"
          >
            <button className="create-btn">About Developer</button>
          </Link>
        </div>
        <div className="menu-logout">
          <LogoutBtn />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
