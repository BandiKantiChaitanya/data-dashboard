import React, { Children, useState } from 'react'
import Context from './Context'

function ContextProvider({children}) {
    let [theme,setTheme]=useState('light')
  return (
    <div>
        <Context.Provider value={[theme,setTheme]}>
            {children}
        </Context.Provider>
    </div>
  )
}

export default ContextProvider