import React from 'react'

const Message = ({index}) => {
  return (
    <div className='flex flex-col text-sm'>
      <div className="py-1rounded-md">Lorem ipsum dolor sit amet.</div>
      <span className={`bg-[#fcf5f3] px-px py-px rounded-sm ${index % 2 == 0 ? "self-start" : "self-end"}`}>1 Hour Ago</span>
    </div>
  );
}

export default Message