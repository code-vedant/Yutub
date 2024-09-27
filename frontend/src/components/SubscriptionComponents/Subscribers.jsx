import React from 'react'
import "../../style/subscribe.style.css"

function Subscribers({subscriber}) {
  return (
    <div className='subscriber-main'>
        <div className="s-left">
            <div className="s-left-imgHolder">
                <img src={subscriber.avatar} alt="" />
            </div>
        </div>
        <div className="s-right">
            <h4> { subscriber ? subscriber.fullName : "FullName" }</h4>
            <h5> @{ subscriber ? subscriber.username : "username" }</h5>
        </div>
    </div>
  )
}

export default Subscribers