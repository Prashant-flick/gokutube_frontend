import React from 'react'

function Logo({
    classname,
    width='20%'
}) {
  return (
    <div>
        <img src="https://res.cloudinary.com/dbmlz6pip/image/upload/v1712023591/dkctjfekmwpvy1mpndoa.png" alt="Logo" className={`${classname} object-cover object-center rounded-full cursor-pointer hover:opacity-60 transition duration-300 ease-in-out`}
            style={{width: width}}
        />
    </div>
  )
}

export default Logo