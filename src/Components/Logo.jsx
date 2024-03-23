import React from 'react'

function Logo({
    classname,
    width='20%'
}) {
  return (
    <div>
        <img src="temp/34322-200.png" alt="Logo" className={`{classname} cursor-pointer hover:opacity-60 transition duration-300 ease-in-out`}
            style={{width: width}}
        />
    </div>
  )
}

export default Logo