import React from 'react'

const HighlightText = ({text}) => {
  return (
    
        <span className="inline-block font-bold text-[#118AB2]
                hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-200
                hover:bg-clip-text hover:text-transparent transition duration-300">
            
            {text}
        </span>
    
  )
}

export default HighlightText
