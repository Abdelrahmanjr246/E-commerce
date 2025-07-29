import axios from "axios";
import { createContext, useEffect, useState} from "react";


export let authContext = createContext(null);

import React from 'react'
import toast from "react-hot-toast";

export default function AuthContextProvider({children}) {


    let [token, setToken] = useState(localStorage.getItem('token') || null);
  
  
    async function verifyToken(){
    try{
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      localStorage.setItem('userId',data.decoded.id)
    }catch(err){
      console.log(err);
      {if (err.response.data.message == 'invalid token. Please login to get access'){
        toast.error(err.response.data.message);
      }}
      setToken(null);
      localStorage.removeItem('token');
    }
  }




  useEffect(() => {
    verifyToken();
  }, []);
  
  

    return (
    <authContext.Provider value={{token, setToken}}>
      {children}
    </authContext.Provider>

    
  )
}
