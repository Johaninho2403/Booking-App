import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider';
import {format} from 'timeago.js'

const Message = ({text, userId, createdAt}) => {
  const {userInfo} = useContext(AppContext)
  return (
    <div className='flex flex-col text-sm'>
      <div className="py-1rounded-md">{text}</div>
      <span className={`bg-[#fcf5f3] px-px py-px rounded-sm ${userId !== userInfo.id ? "self-start" : "self-end"}`}>{format(createdAt)}</span>
    </div>
  );
}

export default Message