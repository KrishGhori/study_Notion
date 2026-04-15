import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[15px] px-6 py-3 rounded-md font-bold shadow-2xl
               ${active ? "bg-yellow-300 text-black" : "bg-[#032833]"}
               hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton
