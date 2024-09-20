import React, { useRef, useState } from 'react'
import EditPassword from './EditPassword'
import EditPersonalInfo from './EditPersonalInfo'
import "../style/editDetails.css"

function EditDetails({closeModal}) {

    const [activeTab, setActiveTab] = useState("Personal Information")


    const toggleTab = (tab) => {
        setActiveTab(tab)
    }

  return (
    <div className='ED-Main'>
        <div className="ED-Head">
            <h3>
                EDIT
            </h3>
        </div>
        <div className="ED-Body">
            <div className="ED-leftNav">
                <ul>
                    {
                        ["Personal Information","Change Password"].map((tab)=>(
                            <li key={tab} className={activeTab===tab?"active":""} onClick={()=>toggleTab(tab)}>
                                {tab}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="ED-rightMain">
                {activeTab === "Personal Information" && (
                    <div className="ED-PersonalInfo">
                        <EditPersonalInfo closeModal={closeModal}/>
                    </div>
                )}
                {activeTab === "Change Password" && (
                    <div className="ED-ChangePassword">
                        <EditPassword closeModal={closeModal}/>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default EditDetails