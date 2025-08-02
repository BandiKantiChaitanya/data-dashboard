import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import Context from '../Context/Context'

function ThemeSwitch() {

    let [theme,setTheme]=useContext(Context)
    
    useEffect(()=>{
            document.body.className=theme
        },[theme])

    function handleToggle(){
        // setTheme(!theme)
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
    

  return (
     <label className="switch">
      <input type="checkbox" checked={theme === 'dark'} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  )
}

export default ThemeSwitch