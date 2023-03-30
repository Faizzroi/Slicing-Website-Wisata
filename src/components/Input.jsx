import React from 'react'

const Input = ({inputplaceholder, email, password}) => {
  return (
    <input type="text" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder={inputplaceholder} />
    )
}

export default Input