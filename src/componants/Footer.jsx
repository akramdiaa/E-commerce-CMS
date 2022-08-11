import { Facebook, Instagram, MailOutline, Phone, Room,} from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { showFooter } from '../redux/footerRedux';

///////CSS  for theme 1
const Container = styled.div`

display: flex;

`;

const Wrapper = styled.div`
height: 50%;
flex:1;
display: flex;
`;


const Left = styled.div`
flex: 1.7;
display: flex;
flex-direction: column;
padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 40px 0px;
 
`;


const Title = styled.h3`
  margin-bottom: 50px;
  font-weight: bold;
`;


const Right = styled.div`
flex: 1;
padding-left: 25%;
padding-top: 1%;

`;


const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

`;

///////CSS  for theme 2

const Container_2 = styled.footer`

position : relative ;
width : 79.8% ;
padding : 40px 10vw ;
padding-bottom : 80px ;
opacity: 0.6;


`;
const Content =styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

`
const Logo_2 = styled.h1`
color:white;
margin-top: 10px;
font-size: 70px;
height: 160px;

`;

const FooterTitle = styled.p`
color: white;
margin-bottom: 10px;
`;
const Info = styled.p`
color: white;
margin-bottom: 20px;

`;

const Footer = () => {



  const [loading, setLoading] = useState()
  const footer = useSelector((state) => state.footer);
  const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
  
    const dispatch = useDispatch();
    const fetchFooter = async () => {
      setLoading(true)

      const response = await axios
        .get('http://websitebuild.herokuapp.com/api/show-details',{headers:{shop:"remonshop"}})
        .catch((err) => {
          console.log("Err: ", err);
          setLoading(false)
        });

        dispatch(showFooter(response.data.data));
        
      setLoading(false)

    };

    useEffect(() => {
      fetchFooter();
    }, []);




    if(themeName ==="theme 1")
    {  return loading ? ('LOADING') : (
      <Container>
          
          
  
              <Wrapper >
                  
                  <Left>
          
                      <Logo style={{fontWeight:"bold",fontFamily:`${font}`}}>{footer.footer.name}</Logo>
                      <Desc style={{fontFamily:`${font}`}}> {footer.footer.description}</Desc>
  
                   </Left>
  
                   <Right> 
                          
                          <Title style={{fontFamily:`${font}`}}> Contacts </Title>
  
                          <ContactItem style={{fontFamily:`${font}`}}>
                               <Room style={{marginRight:"10px"}}/> {footer.footer.address}
                           </ContactItem  >
                               <ContactItem style={{fontFamily:`${font}`}}>
                               <Phone style={{marginRight:"10px"}}/> {footer.footer.phone_number}
                           </ContactItem>
  
                           <ContactItem style={{fontFamily:`${font}`}}>
                               <MailOutline style={{marginRight:"10px"}} /> {footer.footer.email}
                           </ContactItem>
                               
  
                   </Right>
  
              </Wrapper>
         
    
      </Container>
    )}
    else
    {
      return loading ? ("") : (
        <Container_2 style={{backgroundColor: `${primary}`}}>
            

            <Content>
          <Logo_2 style={{color: `${secondry}`,fontFamily:`${font}`}}>{footer.footer.name}</Logo_2>

            </Content>
            
            <FooterTitle style={{fontSize:"35px",fontFamily:`${font}`}}>
              About The Shop
              <Info style={{fontSize:"23px",fontFamily:`${font}`}}>
                {footer.footer.description}
            </Info>
          </FooterTitle>

          <FooterTitle style={{fontSize:"20px",fontFamily:`${font}`}}>
            Contact Info

          <Info style={{fontSize:"12x", fontFamily:"Poiret One",fontFamily:`${font}`}}>
          Address: {footer.footer.address} | Contact Number: {footer.footer.shop_phone_number}  | E-mail: {footer.footer.email}
          </Info>

          </FooterTitle>

        </Container_2>
      )
    }

}

export default Footer