import React from 'react'
import NoContent from "../assets/nocontent.png"

function NoSuchContent() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <img className='w-60 h-60' src={NoContent} alt="" />
        <h3>No such a content</h3>
    </div>
  )
}

export default NoSuchContent