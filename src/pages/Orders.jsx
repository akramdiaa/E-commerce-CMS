import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showOrders } from "../redux/ordersRedux";
import toast, { Toaster } from 'react-hot-toast';

/////CSS for theme 1

const Container = styled.div`
margin:0;
padding:0;
width: 100%;
height:100%;
`;

const RigContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      rgba(0, 0, 0, 0.9),
      rgba(240, 240, 240, 0)
    ),
    url("https://wallpaperaccess.com/full/828886.jpg")
      center;
  background-size: auto;
  display: flex;
  align-items: center;
  justify-content: center;


`;

const Wrapper = styled.div`
  border: 2px solid black;
  width: 40%;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;  
  width: 400px;
  
`;

const Title = styled.h1`
  font-weight: bolder;
`;

const OrderTitle = styled.h2`
  font-weight: 450;
  text-decoration: underline;
  margin-bottom: 10px;
  
`;

const OrderInfo = styled.h3`
  font-weight: lighter;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  
`;

const OrderArea = styled.div`
  flex: 1;

  width: 300px;
  margin: 0px 10px 30px 8px;
  padding: 20px;
  font-size: 20px;
  border: 2px solid black;
`;
  
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 10px;
  width: 100%;

`;



const Button = styled.button`
  margin: 20px 0px;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  font-weight:bold;
  font-size: 20px;
  border: 2px solid black;
  color: white;
  cursor: pointer;
  transition: all 0.5s ease ;
  &:hover{
     background-color: rgba(0,0,0,0.2);
  }
 margin-left: 3%;
`;

////////////CSS for theme 2

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 50vw;
  margin-top: 20px;
  
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;

  text-transform: uppercase;
  letter-spacing: 0.4rem;

  position: absolute;
overflow: auto;
left: 25%;

`;

const WelcomeText = styled.h2`

  padding: 5px;
  margin: 50px;
  margin-top: 25px;
  margin-bottom: 15px;
  
`;



const ButtonContainer = styled.div`
  margin-top: 10px ;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.6rem;
  border-radius: 0.8rem;
  border: none;
  margin: 10px;
  backdrop-filter: blur(25px);
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 60%;
  height: 1rem;
  padding: 20px;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  margin: 7px;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: white;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  background: linear-gradient(to right, #080808 0%, #9b9b9b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Form_2 = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
flex-wrap: wrap;
`;

const RefundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

`

const Wrapper2 = styled.div`

`

const Error = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: bolder;
  margin: 5px;
  margin-top: 0px;
`

const Orders = () => {


  const [loading, setLoading] = useState();
  const [error, setError] = useState("")
  
  const [id, setID] = useState(0)
  const [reason, setReason] = useState("")
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user.currentUser);
  const orders = useSelector((state)=> state.orders.orders);
  const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
  const RefundSent = () => toast(error);

  const showUserOrders= async () => {

    setLoading(true)
    const response = await axios
      .get("http://websitebuild.herokuapp.com/api/Customer/all-orders",{headers:{shop:"remonshop", "auth-token":user}})
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false)
      });
  
    dispatch(showOrders(response.data.data));
     
     
      setLoading(false)
  };

  
  const RefundOrder= async (w) => {
    w.preventDefault();
    setLoading(true)
    const response = await axios
      .post("http://websitebuild.herokuapp.com/api/Customer/refund_request/",{id,reason},{headers:{shop:"remonshop", "auth-token":user}})
      .catch((err) => {
        setError(err.response.data.msg)
        setLoading(false)
      });
      
      RefundSent()
      setError(response.data.msg)
  };

  useEffect(() => {
    showUserOrders()
  }, [])


  


  if(themeName ==="theme 1")
  {  return loading? ("loading") : (


    <Container>
      <Toaster />
      <RigContainer>
        <Wrapper>
          <Title style={{fontFamily:`${font}`}}>Your Orders</Title>
          <Form>
          {orders.map(item => (
              <OrderArea item={item} key={item.id}>
                <OrderTitle style={{fontFamily:`${font}`}}>OrderID {item.id}:</OrderTitle>
                <OrderInfo style={{fontFamily:`${font}`}}>Status: {item.status}</OrderInfo >
                <OrderInfo style={{fontFamily:`${font}`}}>Note: {item.note!==""? (item.note) : "No Note"}</OrderInfo>
                <OrderInfo style={{fontFamily:`${font}`}}>Subtotal_price: {item.subtotal_price}</OrderInfo>
                <OrderInfo style={{fontFamily:`${font}`}}>Discounts: {item.discounts}</OrderInfo>
                <OrderInfo style={{fontFamily:`${font}`}}>Shipping_pice: {item.shipping_price}</OrderInfo>
                <OrderInfo style={{fontFamily:`${font}`}}>Extra shipping_pice: {item.extra_shipping}</OrderInfo>
                <OrderInfo style={{fontFamily:`${font}`}}>Total_price: {(item.extra_shipping+item.shipping_price+item.subtotal_price-item.discounts <0)? 0:(item.extra_shipping+item.shipping_price+item.subtotal_price-item.discounts)}</OrderInfo>
              </OrderArea>
            ))}
            
            <RefundContainer>
            <Input style={{fontFamily:`${font}`}} type="number" placeholder="Order ID" value={id} onChange={(e) =>{setID(e.target.value)}}/>
            <Input style={{fontFamily:`${font}`}} type="text" placeholder="Reason" value={reason} onChange={(e) =>{setReason(e.target.value)}}/>
            </RefundContainer>
            <Button onClick={(e) => RefundOrder(e)} style={{fontFamily:`${font}`}}>Refund</Button>
          </Form>
        </Wrapper>
      </RigContainer>
    </Container>
    
  )}
  else
  {
    return(  
      <Wrapper2>
        <Toaster/>
      <MainContainer style={{background:`linear-gradient(to right, ${primary} 0%, ${secondry} 79%)`}}>
      <WelcomeText style={{fontFamily:`${font}`}}>Your Orders </WelcomeText>
      <Form_2>
            {orders.map(item => (
                <OrderArea item={item} key={item.id}>
                  <OrderTitle style={{fontFamily:`${font}`}}>Order ID{item.id}:</OrderTitle>
                  <OrderInfo style={{fontFamily:`${font}`}}>Status: {item.status}</OrderInfo >
                  <OrderInfo style={{fontFamily:`${font}`}}>Note: {item.note!==""? (item.note) : "No Note"}</OrderInfo>
                  <OrderInfo style={{fontFamily:`${font}`}}>Subtotal_price: {item.subtotal_price}</OrderInfo>
                  <OrderInfo style={{fontFamily:`${font}`}}>Discounts: {item.discounts}</OrderInfo>
                  <OrderInfo style={{fontFamily:`${font}`}}>Shipping_pice: {item.shipping_price}</OrderInfo>
                  <OrderInfo style={{fontFamily:`${font}`}}>Extra shipping_pice: {item.extra_shipping}</OrderInfo>
                  <OrderInfo style={{fontFamily:`${font}`}}>Total_price: {(item.extra_shipping+item.shipping_price+item.subtotal_price-item.discounts <0)? 0:(item.extra_shipping+item.shipping_price+item.subtotal_price-item.discounts)}</OrderInfo>
                </OrderArea>
              ))}
              
        </Form_2>
      <HorizontalRule  style={{background:`linear-gradient(to right, ${secondry} 0%, ${primary} 100%)`}}/>
      <RefundContainer>
      <StyledInput style={{fontFamily:`${font}`}} type="number" placeholder="Order ID" value={id} onChange={(e) =>{setID(e.target.value)}}/>
      <StyledInput style={{fontFamily:`${font}`}} type="text" placeholder="Reason" value={reason} onChange={(e) =>{setReason(e.target.value)}}/>
      </RefundContainer>
      <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>
      <ButtonContainer>
        <StyledButton onClick={(e) => RefundOrder(e)}  style={{background:`linear-gradient(to right, ${secondry} 30%, ${primary} 80%)`,}}>REFUND</StyledButton>
      </ButtonContainer>

    

  </MainContainer>
      </Wrapper2>



      )
      

  }

}

export default Orders