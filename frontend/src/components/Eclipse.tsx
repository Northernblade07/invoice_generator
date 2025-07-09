import React from 'react'

const Eclipse = ({className,blur,color}:{className:string,blur:string,color:string}) => {
  return (
    <div className={`bg-[${color}] rounded-full  blur-[${blur}] ${className} `}></div>
  )
}

export default Eclipse