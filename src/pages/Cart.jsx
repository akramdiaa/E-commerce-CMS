import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../componants/Footer";
import {clear} from '../redux/cartRedux'
import toast, { Toaster } from 'react-hot-toast';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
color: white;
background-color: black;
transition: 1s ease;

}
`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
font-weight: 600 ;
`;

const ProductId = styled.span`
font-weight: 600 ;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 4px;
`;

const ProductSize = styled.span`
font-weight: 600 ;`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;

const Hr = styled.hr`
  background-color: #000000;
  border: none;
  height: 3px;
  margin: 10px;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`;

const SummaryTitle = styled.h1`
  font-weight: bold;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
font-weight: 600;
`;

const SummaryItemPrice = styled.span`
font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
&:hover {
color: black;
background-color: white;
transition: 1s ease;

}
`;
const CommentDis = styled.div`
font-size: 40px;
font-weight: bold;
`;

const Comment = styled.textarea`
  width: 50%;
  height: 100px;
  margin: 10px 0;
  padding: 3px;
  font-weight: bold;
  resize: none;
`;

const DisContainer = styled.div`
margin: 20px;
height: 70px;
display: flex;
align-items: center;
justify-content: center;

font-weight: bold;
`;

const DisArea = styled.textarea`
font-weight: bold;
font-size: 18px;
resize: none;
`;

const ApplyButton = styled.button`
  width: 50%;
  height: 5.1vh;
  margin-left: 20px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
&:hover {
color: black;
background-color: white;
transition: 1s ease;
}
`;

const Error = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: bolder;
  margin: 5px;
  margin-top: 0px;
`

const SingleProductContainer = styled.div``

const Cart = () => {

  const [note, setNote] = useState("")
  const [discounts, setDiscounts] = useState("")
  const [disValue, setDisValue] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [duration, setDuration] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch();


  const user = useSelector((state)=> state.user.currentUser);
  const products = useSelector(state => state.cart)
  
  const {font} = useSelector((state)=> state.theme)
  const userDetails = useSelector((state) => state.user.userInfo);
  const [email, setEmail] = useState(userDetails.email);
  const [total, setTotal] = useState(products.total);

  
  let navigate = useNavigate(); 
  let path = `/Login`; 






  const fetchDisCode = async () => {


    const response = await axios
      .post("http://websitebuild.herokuapp.com/api/validate-discount",{discounts},{headers:{shop:"remonshop"}})
      .catch((err) => {
        console.log("Err: ", err.response);
        setError(err.response.data.msg)
      });
      const x = response.data.data.value;
      setDisValue(x < 0? 0: x)
     if(disValue<0)
     {
      setDisValue(0)
     }
    
      if(total <= disValue){
          setDisValue(0)
      }
      
      
  };


  const fetchShipping = async () => {


    const response = await axios
      .post("http://websitebuild.herokuapp.com/api/calculate_shipping",{email},{headers:{shop:"remonshop"}})
      .catch((err) => {
        console.log("Err: ", err.response);
        setError(err.response.data.msg)
      });

      setShipping(response.data.data.price)
      // console.log(response.data.data)
      setDuration(response.data.data.duration)
  };


  const fetchSendOrder = async () => {


    const response = await axios
      .post("http://websitebuild.herokuapp.com/api/Customer/place_order",{discounts,note},{headers:{shop:"remonshop","auth-token":user}})
      .catch((err) => {
        console.log("Err: ", err.response);
        setError(err.response.data.msg)
      });
      
      
 
      
  };




  useEffect(() => {
    fetchShipping()

  }, [total]);





  const routeChange = () =>{ 
    navigate(path);
  }




  const CartCheck = () => toast('Cart is Empty');
  const ClearCheck = () => toast('Cart is Already Empty');
  const SendOrder = () => toast('Order Sent');

  const handleClick = (e)=>
  {
    e.preventDefault()
    if(user==null)
    {
      routeChange()
    }
    else if(products.products.length==[])
    {
      CartCheck()
    }
    else
    {
      
      fetchSendOrder()
      SendOrder()
      dispatch(
        clear()
      );
      setTotal(0)
      if(total <= disValue){
        setDisValue(0)
    }
    setError("")
    }

 

  }
  const  handleClick2 = (e)=>
  {
    e.preventDefault()
    if(products.products.length==[])
    {
      ClearCheck()
    }
    else
    {

      dispatch(
        clear()
      );

    }
    setTotal(0)

 
  }





return (
    
  <Container>
    {console.log(products.total)}
    {}
    <Toaster />
    <Wrapper>
      <Title>YOUR CART</Title>
      <Top>
        <Link to="/" style={{textDecoration:"none"}}>
        <TopButton style={{fontFamily:`${font}`}} >CONTINUE SHOPPING</TopButton>
        </Link>
      </Top>
      <Bottom>
        <Info >
         { products.products.map(SingleProduct=>(
          <SingleProductContainer  item= {SingleProduct.id} key={SingleProduct.id}>
              <Product>
          
          <ProductDetail >
            <Image src={SingleProduct.image.image} />
            <Details>
              <ProductName style={{fontFamily:`${font}`}}>
                <b style={{fontFamily:`${font}`}}>Product:</b> {SingleProduct.name}
              </ProductName>
              <ProductId>
                <b style={{fontFamily:`${font}`}}>ID:</b> {SingleProduct.id}
              </ProductId>
              <b style={{fontFamily:`${font}`}}>Color: </b>{SingleProduct.variant1!==""? <ProductColor color={SingleProduct.variant1} /> : <></>} 
              <ProductSize>
              <b style={{fontFamily:`${font}`}}>Size: </b>{SingleProduct.variant2!==""? SingleProduct.variant2 : <></>}
              </ProductSize>
            </Details>
          </ProductDetail>
          <PriceDetail>
            <ProductAmountContainer>
              <ProductAmount>{SingleProduct.quantity}</ProductAmount>
            </ProductAmountContainer>
            <ProductPrice style={{fontFamily:`${font}`}}>{SingleProduct.price* SingleProduct.quantity} LE</ProductPrice>
          </PriceDetail>
      
        </Product>
               <Hr />
          </SingleProductContainer>

          ))}
        </Info>
        <Summary>
          <SummaryTitle style={{fontFamily:`${font}`}}>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText style={{fontFamily:`${font}`}}>Subtotal</SummaryItemText>
            <SummaryItemPrice style={{fontFamily:`${font}`}}>{products.total} LE</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText style={{fontFamily:`${font}`}}> Shipping Fees </SummaryItemText>
            <SummaryItemPrice style={{fontFamily:`${font}`}}>{shipping} LE</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText style={{fontFamily:`${font}`}}> Shipping Duration </SummaryItemText>
            <SummaryItemPrice style={{fontFamily:`${font}`}}>{duration}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem >
            <SummaryItemText style={{fontFamily:`${font}`}}>Discount</SummaryItemText>
            <SummaryItemPrice style={{fontFamily:`${font}`}}>{disValue} LE</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem  type="total">
            <SummaryItemText style={{fontFamily:`${font}`}}>Total</SummaryItemText>
            <SummaryItemPrice value={total} style={{fontFamily:`${font}`}} onChange={e => setTotal(e.target.value)}>{(total+shipping-disValue <0)? 0:(total+shipping-disValue)} LE</SummaryItemPrice>
          </SummaryItem>
          <DisContainer style={{fontFamily:`${font}`}}>
            Discount Code
            <DisArea type="text" value={discounts} style={{fontFamily:`${font}`}} onChange={e => setDiscounts(e.target.value)} />
               

            <ApplyButton style={{fontFamily:`${font}`}} onClick={(e)=>{fetchDisCode(e)}}> 
                  Apply
            </ApplyButton>
          </DisContainer >
          <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>
          <Button style={{fontFamily:`${font}`}} onClick={(e)=>handleClick(e)}>CHECKOUT NOW</Button>
          <Button style={{fontFamily:`${font}`}} onClick={(e)=>handleClick2(e)}>CLEAR CART</Button>
        </Summary>
      </Bottom>
      
      <CommentDis style={{fontFamily:`${font}`}}>NOTE</CommentDis>

      <Comment type="text" value={note} style={{fontFamily:`${font}`}} onChange={e => setNote(e.target.value)}/>
    </Wrapper>
    <Footer/>
  </Container>
);};

export default Cart;
