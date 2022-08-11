import { Badge } from '@material-ui/core';
import { LocalMallTwoTone, Search, ShoppingCartOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    useNavigate,
    Link,

  } from "react-router-dom";
import {clearUserInfo, logout} from '../redux/loginRedux'
import { useEffect, useState } from 'react';
import DropdownMenu, { DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { clearOrders } from '../redux/ordersRedux';
import axios from 'axios';
import { showProducts } from '../redux/productsRedux';



////////////////CSS of theme 1
const Container=styled.div`
    height: 60px;
    margin:0;
padding:0; 
`;

const Wrapper  = styled.div`
padding: 10px 20px;
display: flex;
align-items: center;
justify-content: space-between;

`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;


const SearchContainer = styled.div`
border: 1px solid white;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`;

const Input= styled.input`
border :none;
font-weight: bold;
margin-right: 10px;
`;

const Center = styled.div`
flex:1;
text-align :center;
max-width: 300px;
`;

const Logo =styled.h1`
font-weight: bold;
color:white;
transition: 500ms;
&:hover{
   
    transform: scale(1.4);
    transition: 500ms;
}
`
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
`;
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left:25px;
margin-right:25px;
margin-bottom: 10px;
margin-top: 10px;


transition: 500ms;
&:hover{
  
    transform: scale(1.4);
    transition: 500ms;
}
`;

const Cart = styled.div`
font-size: 14px;
cursor: pointer;
margin-left:25px;

color: white;
transition: 500ms;
&:hover{
  
    transform: scale(1.4);
    transition: 500ms;
}
`;

const NormalShow = styled.div`
color: white;
`;

const DropStyle = styled.div`
    
    
    border-radius: 20px;
    margin-right: 10px;
    transition: 500ms;
    
    &:hover{
  
  transform: scale(1.4);
  transition: 500ms;

}
`;

const ItemsStyle = styled.div`

    transition: 500ms;
    margin-right: 10px;

`;

/////////////////////////////CSS of theme 2

const Container_2=styled.div`
position: sticky;
top: 0;
left: 0;
width: 100%;
z-index: 9;
`;

const Wrapper_2 =styled.div`
padding:  10px 10vw;
display: flex;
align-items: center;
justify-content: space-between;
`;

const Logo_2 =styled.h1`
font-weight: bold;
color:white;

transition: 500ms;
&:hover{
   
    transform: scale(1.4);
    transition: 500ms;
}
`;

const NavItems=styled.div`
    display: flex;
    align-items: center;

`;

const Search_2=styled.div`
width: 500px;
display: flex;
`;

const Input_2=styled.input`
    width: 80%;
    height: 20px;
    padding: 10px;
    border-top-left-radius:10px;
    border-bottom-left-radius: 10px;
    border:1px solid black;
    text-transform: capitalize;
    background-color: rgba(255, 255, 255, 0.445);
    color: white ;
    outline: none;
    ::placeholder{
        color: white;
    }
`;

const Button=styled.button`
    width: 20%;
    padding: 10px 20px;
    border: none;
    outline: none;
    cursor: pointer;
    background: black;
    color: white;
    text-transform: capitalize;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-right: 10px;

`;



const Navbar = () => {

    let navigate = useNavigate(); 
    let path = `/`; 

    const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
    const footer = useSelector((state) => state.footer);
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector((state)=> state.user.currentUser)
    const userName= useSelector((state)=> state.user.userInfo)
    const fullName = userName.first_name + " " +userName.second_name;
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");


    const fetchSearch = async (w) => {
        w.preventDefault();
        const response = await axios
          .get(`http://websitebuild.herokuapp.com/api/Customer/search-product/${query}`,{headers:{shop:"remonshop"}})
          .then((resp) => {
            dispatch(showProducts(resp.data.data));
          })
          .catch((err) => {
            console.log("Err: ", err.response);
            dispatch(showProducts([]));
          });
       
      };
  
      useEffect(() => {
        
      }, [])





    const routeChange = (e) =>{ 
        e.preventDefault()
        navigate(path);
        
      }

    const handleClick = ()=>
    {
        dispatch(
            logout()
            )
          
    }

    useEffect(() => {
        if ( user == "") {        
            return () => {
            dispatch(clearUserInfo());
            dispatch(clearOrders());
          };};
            
      }, [user]);
    
      



      if(themeName ==="theme 1"){
        return (

            <Container  style={{backgroundColor: `${primary}`}}>
                <Wrapper>
                    <Left>
                        <SearchContainer onClick={e=> routeChange(e)}>
                            <Input  style={{fontFamily:`${font}`}} placeholder="search" onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                            <Search  style={{color:"white", fontSize:16,cursor:"pointer"}} onClick={(e)=>{fetchSearch(e)}} /> 
                            
                        </SearchContainer>
 
        
        
        
                    </Left>
        
                    <Center>
        
                    <Link to="/" style={{textDecoration:"none"}}><Logo style={{fontFamily:`${font}`}}>remonshop SHOP</Logo> </Link>
        
                    </Center>
                    {/* style={{backgroundColor: `${primary}`}} */}
        
                    <Right>
            
                    {user ? <DropStyle style={{backgroundColor: `${secondry}`,fontFamily:`${font}`}}>   <DropdownMenu trigger={fullName}   style={{fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}>
                                <ItemsStyle style={{backgroundColor: `${primary}` , }}>   <DropdownItemGroup>
                                                                                        <MenuItem  onClick={handleClick} style={{color: `${secondry}`,fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}>LOGOUT</MenuItem>
                                                                                         <Link to="/Profile" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}} > PROFILE </MenuItem></Link>
                                                                                         <Link to="/Orders" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}}>ORDERS</MenuItem></Link>
                                                                                         <Link to="/Refund" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}}>REFUND</MenuItem></Link>
                                            </DropdownItemGroup></ItemsStyle>
                            </DropdownMenu ></DropStyle>: 
                    <NormalShow>
                    <Link to="/Login" style={{fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}><Cart >LOGIN IN</Cart> </Link>
                     <Link to="/Register" style={{fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}><Cart >REGISTER </Cart> </Link>
                     </NormalShow>  }
                         
                       
        
                        <Cart>
                        <Badge badgeContent={quantity} color="error">
                        <Link to="/Cart" > <ShoppingCartOutlined  style={{color:"white" }} /> </Link>
                        </Badge>
                        </Cart>
                         
                    </Right>
                </Wrapper>
            </Container>
          )
      }
      else {
        return (
            <Container_2  style={{backgroundColor: `${primary}`}}>
                <Wrapper_2>
                    <Logo_2 style={{fontFamily:`${font}`}} onClick={e=> routeChange(e)}> {footer.footer.name} </Logo_2> 
 
                    <NavItems>
                        <Search_2 SearchContainer onClick={e=> routeChange(e)}>
                        <Input_2 style={{fontFamily:`${font}`}} type="text"  placeholder='Search'  onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                        <Button style={{backgroundColor: `${secondry}`,fontFamily:`${font}`}} onClick={(e)=>{fetchSearch(e)}}>Find</Button>
                    </Search_2>


                    {user?  
                        <DropStyle style={{backgroundColor: `${secondry}` }}> 
                            <DropdownMenu trigger={fullName} style={{fontFamily:`${font}`}} >
                                <ItemsStyle style={{backgroundColor: `${primary}` }}>   
                                    <DropdownItemGroup>
                                        <MenuItem  onClick={handleClick} style={{color: `${secondry}`,fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}>LOGOUT</MenuItem>
                                        <Link to="/Profile" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}}> PROFILE </MenuItem></Link>
                                        <Link to="/Orders" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}}>ORDERS</MenuItem></Link>
                                        <Link to="/Refund" style={{fontWeight:"bold", textDecoration:"none"}}><MenuItem style={{color: `${secondry}`,fontFamily:`${font}`}}>REFUND</MenuItem></Link>
                                    </DropdownItemGroup>
                                </ItemsStyle>           
                                </DropdownMenu >
                            </DropStyle>
                            : 

                    <NormalShow>
                        <Link to="/Login" style={{fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}><Cart >LOGIN</Cart> </Link>
                        <Link to="/Register" style={{fontWeight:"bold", textDecoration:"none",fontFamily:`${font}`}}><Cart >REGISTER </Cart> </Link>
                     </NormalShow> 
                      } 
                    <Cart>
                        <Badge badgeContent={quantity} color="error">
                            <Link to="/Cart" > <LocalMallTwoTone  style={{color:"white"}} /> </Link>
                        </Badge>
                    </Cart>
                    </NavItems>
                </Wrapper_2>

            </Container_2>
          )
      }

}

export default Navbar