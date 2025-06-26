import { useState } from "react";
import { motion } from "framer-motion";
import "../../style/sidebar.css"; 
import { TbLayoutSidebarLeftExpandFilled ,TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual,MdOutlineBookmarkAdded  ,MdOutlinePostAdd  } from "react-icons/md";
import { RiPagesLine,RiPlayList2Fill  } from "react-icons/ri";
import { IoImagesOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import LogoutBtn from "../LogoutBtn.jsx";


const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <TbLayoutSidebarRightExpandFilled/> : <TbLayoutSidebarLeftExpandFilled/> }
      </button>

      <motion.div
        className="sidebar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <Link to={"/"} className="menu-logo">YUTUB</Link>
        <ul>
          <li><Link to={"/videos"}><GoVideo className="link-icon"/><span>Video</span></Link></li>
          <li><Link to={"/photos"}><MdOutlinePhotoSizeSelectActual className="link-icon"/><span>Photos</span></Link></li>
          <li><Link to={"/posts"}><RiPagesLine className="link-icon"/><span>Posts</span></Link></li>
          <div className="separator"></div>
          <h4>Videos</h4>
          <li><Link to={"/videos/watchhistory"}><LuHistory className="link-icon"/><span>History</span></Link></li>
          <li><Link to={"/videos/playlist"}><RiPlayList2Fill className="link-icon"/><span>Playlist</span></Link></li>
          <li><Link to={"/videos/liked"}><BiLike className="link-icon"/><span>Liked videos</span></Link></li>
          <div className="separator"></div>
          <h4>Photos</h4>
          <li><Link to={"/photos/saved"}><MdOutlineBookmarkAdded  className="link-icon"/><span>Saved</span></Link></li>
          <li><Link to={"/photos/liked"}><FaRegHeart className="link-icon"/><span>Liked</span></Link></li>
          <li><Link to={"/photos/collections"}><IoImagesOutline className="link-icon"/><span>Collections</span></Link></li>
          <div className="separator"></div>
          <h4>Posts</h4>
          <li><Link to={"/dashboard"}><MdOutlinePostAdd className="link-icon"/><span>Write</span></Link></li>
          <li><Link to={"/posts/liked"}><FaRegHeart className="link-icon"/><span>Liked</span></Link></li>
          <div className="separator"></div>
        </ul>
        <div className="menu-logout">
            <LogoutBtn />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
