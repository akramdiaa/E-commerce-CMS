
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Categories from '../componants/Categories';
import Footer from '../componants/Footer';
import Products from '../componants/Products';
import { showUserInfo } from '../redux/loginRedux';



const Title = styled.div`
height: 15px;
padding: 10px;
margin: 10px;
display: flex;
justify-content: center;
align-items: center;
font-size: 25px;
font-weight: bold;
opacity: .7;
text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

`



const Home = () => {

  const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
  const user = useSelector((state)=> state.user.currentUser);
  const [loading, setLoading] = useState(true) ;  
  const dispatch = useDispatch();

  const showNewUserInfo = async () => {
      
    setLoading(true)

    if(user!=null){const response = await axios
      .get("http://websitebuild.herokuapp.com/api/auth-customer/profile",{headers:{shop:"remonshop", "auth-token":user}})
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false)
      });
      
      dispatch(showUserInfo(response.data.data));
  
      setLoading(false)
  }};
  useEffect(() => {
    if(user!=null)showNewUserInfo()
  }, [])
  


  if(themeName ==="theme 1"){ 
     return (
    <div >
        
        <Title style={{backgroundColor: `${secondry}`,color:`${primary}`,fontFamily:`${font}`}}> Categories </Title>
        <Categories/>
        <Title style={{backgroundColor: `${secondry}`,color:`${primary}`,fontFamily:`${font}`}}> Products </Title>
        <Products/>
        <Title style={{backgroundColor: `${secondry}`,color:`${primary}`,fontFamily:`${font}`}}> about us </Title>
        <Footer/>
        
    </div>
  )}
  else 
  {
    return (
      <div >
          
          <Categories/>
     
          <Products/>
       
          <Footer/>
          
      </div>
    )
  }

}

export default Home