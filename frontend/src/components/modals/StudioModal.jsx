import { useState } from "react";
import "../../style/studio/mainModal.css";
import { IoClose } from "react-icons/io5";
import VideoUploadModal from "../VideoUploadModal.jsx";
import AddPhotoModal from "./studio/AddPhotoModal.jsx";
import AddPostModal from "./studio/AddPostModal.jsx";
import EditDetails from "../Profile/EditDetails.jsx";

function StudioModal({ closeModal,tab }) {
  const [activeTab, setActiveTab] = useState(tab || "Dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <div className="tab-content">Welcome to the Dashboard</div>;
      case "Videos":
        return <div className="tab-content"><VideoUploadModal /></div>;
      case "Photos":
        return <div className="tab-content"><AddPhotoModal/></div>;
      case "Post":
        return <div className="tab-content"><AddPostModal/></div>;
      case "Settings":
        return <div className="tab-content"> <EditDetails/></div>;
      default:
        return null;
    }
  };

  const tabs = ["Dashboard", "Videos", "Photos", "Post", "Settings"];

  return (
    <div className="studio-Main">
      <div className="studio-Head">
        <h2>YUTUB Studio</h2>
        <div onClick={closeModal} className="modal-close-button">
          <IoClose className="mcb-x" />
        </div>
      </div>

      <div className="studio-body">
        <div className="studio-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="studio-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default StudioModal;
