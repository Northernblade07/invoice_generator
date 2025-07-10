import React from 'react';

const Logo = ({width , height}:{width:number,height:number}) => {
  return (
    <div className={`w-[${width}px] h-[${height}px] relative flex items-center justify-center`}>
      <div
        className='absolute top-0 left-0 w-full h-full bg-white'
        style={{
          clipPath:
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      ></div>

      <div className="relative flex items-center justify-between w-[21px] h-[27px]">
        <svg viewBox="0 0 12 20" className="w-[10px] h-[20px]">
          <polyline
            points="10,0 0,10 10,20"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg viewBox="0 0 12 20" className="w-[10px] h-[20px]">
          <polyline
            points="2,0 12,10 2,20"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Logo;

{/* <div
        className='absolute top-0 left-0 w-full h-full bg-[#FFFFFF]}'
        style={{
          clipPath:
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      ></div> */}