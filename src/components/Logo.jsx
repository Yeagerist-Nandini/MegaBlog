import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className={`flex w-16 ${width}`}>
      <img src='src\assets\logo.png' alt='logo'/>
    </div>
  )
}

export default Logo