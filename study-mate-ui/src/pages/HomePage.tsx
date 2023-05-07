import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
      navigate("/login");
  },[navigate]);

  return <></>;
}

export default HomePage