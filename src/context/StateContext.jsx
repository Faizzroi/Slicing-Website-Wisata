import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const StateValue = createContext()

export const StateContext = ({children}) => {
  const container = "w-[31em] h-[44em] shadow-[4px_4px_11px_1px_#89888888] flex flex-col items-center justify-evenly"

  return (
    <StateValue.Provider value={{container}} >{children} </StateValue.Provider>
  )
}

export const useStateContext = () => useContext(StateValue)