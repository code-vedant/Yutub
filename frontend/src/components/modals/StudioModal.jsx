import { useState } from "react";
import "../../style/studio/mainModal.css";
import { IoClose } from "react-icons/io5";
import uploadVideo from "./studio/uploadVideo.jsx";

function StudioModal({ closeModal }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <div className="tab-content">Welcome to the Dashboard</div>;
      case "Videos":
        return <div className="tab-content"><uploadVideo /></div>;
      case "Photos":
        return <div className="tab-content">Your photo library goes here.</div>;
      case "Post":
        return <div className="tab-content">You can post updates here.</div>;
      case "Settings":
        return <div className="tab-content">Configure your preferences here.</div>;
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
