import React from 'react'
import Login from './login/Login'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
      navigate("/login");
  },[]);

  return <></>;
}

export default HomePage