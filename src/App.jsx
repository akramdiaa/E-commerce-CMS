import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import SpecificCategory from "./pages/SpecificCategory";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./componants/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./pages/Orders";
import Refund from "./pages/Refund";
import axios from "axios";
import { useEffect, useState } from "react";
import { themeColors } from "./redux/themeRedux";

import {TrinitySpinner} from 'loading-animations-react';
import styled from "styled-components";





const LoaddingContainer = styled.div`
position: absolute;
top: 30%;
left: 38%;
transform: translate(0, -50%);
padding: 10px;
height: 20%;
width: 20%;
`;


const App = () => {


  let host = window.location.host;
  let protocol = window.location.protocol;
  let parts = host.split(".");
  let subdomain = "";
  if (parts.length >= 3) {
    subdomain = parts[0];

    parts.splice(0, 1);
 
    window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
  }

 

  const [loading, setLoading] = useState()
  const { primary } = useSelector((state)=> state.theme)
  const [loadingColor, setloadingColor] = useState("")
  const user = useSelector((state)=> state.user.currentUser)
  const dispatch = useDispatch();
console.log(user)
  const fetchTheme = async () => {
    setLoading(true)

    const response = await axios
      .get('http://websitebuild.herokuapp.com/api/shop/show-theme',{headers:{shop:"remonshop"}})
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false)
      });

      dispatch(themeColors(response.data.data))
      setloadingColor(primary)
    setLoading(false)
  };

  useEffect(() => {
    fetchTheme();
    setloadingColor(primary)

  }, []);




  return loading? <LoaddingContainer><TrinitySpinner color={`${loadingColor}`} /></LoaddingContainer>  :(

   
    <Router>

      <Navbar/>
      
      <Routes>
      
      <Route  exact path='/' element={ <Home/>} />

      <Route path='/Login' element={user ? <Navigate to='/' replace /> : <Login/> }/> 
     <Route path='/ResetPassword' element={<ResetPassword/>} />
     <Route path='/ChangePassword' element={<ChangePassword/>} />
     <Route path='/Profile' element={user ?  <Profile/> : <Navigate to='/Login' replace />}/>
      <Route path='/Register' element={user ? <Navigate to='/' replace /> : < Register/>} />
 
    
      <Route path='/Product/:productId' element={<SingleProduct/>}/>

      <Route path='/Category/:categoryId' element={<SpecificCategory/>}/>
      <Route path='/Orders' element={user ? <Orders/> : <Navigate to='/' replace /> }/>
      <Route path='/Refund' element={user ? <Refund/> : <Navigate to='/' replace /> }/>

      <Route path='/Cart' element={<Cart/>} />

     

      <Route path="*" element={<Navigate to='/' replace /> }/>

    </Routes>

        
      

    </Router>


  

  )
};

export default App;