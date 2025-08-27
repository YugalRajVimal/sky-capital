import { createContext, useState } from "react";


export const contextCreate=createContext(null);


export const ContextProvider=({children})=>{
 
    return <>
       <contextCreate.Provider value={value}>
        {children}
       </contextCreate.Provider>
    </>
}