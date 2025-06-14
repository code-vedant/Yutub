import React from 'react'
import "../style/animated.css"

export default function TestimonialCard({item}) {
  return (
    <div className='testimonial-main'>
        <h2>@{item.username}</h2>
        <p>{item.testimonial}</p>
    </div>
  )
}
