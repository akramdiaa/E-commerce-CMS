import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TrinitySpinner} from 'loading-animations-react';
import styled from "styled-components";
import Footer from "../componants/Footer";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { removeSingleProduct,  showSingleProduct} from "../redux/singleProductRedux";
import { addProduct } from "../redux/cartRedux";
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const Slidecontainer = styled.div`
  width: 30vw;
  height:70vh;
  flex: 1;
  margin-left: 100px ;
  padding: 0px;

`;
const Eachslide = styled.div`
  
  width: 300px;
  height: 450px;
  margin:25%;
  color: white;
  font-weight: bold;
  font-size: 60px;

  
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  margin-top: 150px;
  margin-left: 300px;
`;

const Title = styled.h1`
  margin-bottom: 60px;
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
 
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;

`;

const Filter = styled.div`
  display: flex;
  align-items: center;

`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  font-weight: 700;

margin-left: 20px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 4px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  
`;

const FilterSizeOption = styled.option`

`;

const AddContainer = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid ;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  &:hover{
     background-color: rgba(0,0,0,0.2);
  }
`;

const LoaddingContainer = styled.div`

position: absolute;
top: 20%;
left: 45%;
transform: translate(0, -50%);
padding: 10px;

height: 110px;
width: 110px;
`
const Error = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: bolder;
  margin: 5px;
`

let slideImages = [];

const SingleProduct = () => {
  

  const { productId } = useParams();
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [variant1, setVariant1] = useState("");
  const [variant2, setVariant2] = useState("");
 console.log(variant1)
  let image = slideImages[0];
  const singleProduct = useSelector((state) => state.singleProduct);
  
  const {  id,name, price, description,options,pvariant } = singleProduct.singleProduct;

  const dispatch = useDispatch();
  const cartDispatch = useDispatch();
  const {primary , secondry,font} = useSelector((state)=> state.theme)
  const user = useSelector((state)=> state.user.currentUser);
  let navigate = useNavigate(); 
  let path = `/Login`; 

  const fetchSendOrder = async () => {
    
    const response = await axios
      .post("http://websitebuild.herokuapp.com/api/Customer/add_product",{name,variant1,variant2,quantity},{headers:{shop:"remonshop", "auth-token":user}})
      .catch((err) => {
        console.log(err.response.data.msg)
      });
  };
  

  const fetchProductDetail = async (id) => {
    setLoading(true)

    const response = await axios
      .get(`http://websitebuild.herokuapp.com/api/Customer/show-Product-id/${id}`,{headers:{shop:"remonshop"}})
      .catch((err) => {
        console.log("Err: ", err);
        setLoading(false)
      });
    dispatch(showSingleProduct(response.data.data));
    slideImages = response.data.data.image

 
    setLoading(false)
  };



  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSingleProduct());
    };
  }, [productId]);

  const CartAdd = () => toast('Added To Cart');
  const ChooseVar = () => toast('Please Select The Variants');

  const routeChange = () =>{ 
    navigate(path);
  }



    const handelQauntity = (type) => {
      if(type ==="dec"){
       quantity>1 && setQuantity(quantity-1)
      }
      else{
        setQuantity(quantity+1)
      }
    }


    const handleClick = ()=>
    {
      if(user==null)
      {
        routeChange()
      }


      else
      {
        
            cartDispatch(
              addProduct({  id,price,image,name,variant1,variant2,quantity})
            );
            fetchSendOrder()
            CartAdd();
 


        }

        

    }
    

    return loading ? <LoaddingContainer><TrinitySpinner color={`${secondry}`} /></LoaddingContainer> : (
      
      <Container>
      {  console.log(singleProduct.singleProduct.pvariant.map(item => (options.length === 0)))}
        <Toaster />
        <Wrapper>

        <Slidecontainer >
          <Slide >
           { slideImages.map((slideImage, index)=> (
              <Eachslide key={index}>
                <Image src={slideImage.image}>
                </Image>
              </Eachslide>
            )) } 
          </Slide>
        </Slidecontainer>

          <InfoContainer>
            <Title style={{fontFamily:`${font}`}}>{name}</Title>

            <Desc style={{fontFamily:`${font}`}}>{description}</Desc>

            <Price style={{fontFamily:`${font}`}}>{price} LE</Price>
            <FilterContainer>
              {singleProduct.singleProduct.pvariant.map(item => (options.map(option =>((item.option_id === option.id && option.name==='color')))))?   
              <Filter>
                <FilterTitle style={{fontFamily:`${font}`}}>Color:</FilterTitle>
                 {singleProduct.singleProduct.pvariant.map(item => (<FilterColor key={item.id} color={options.map(option =>((item.option_id === option.id && option.name==='color') ? item.value : null))}  onClick={() => setVariant1(item.value)}/>  )) }
              </Filter> : <></>}


             {singleProduct.singleProduct.pvariant.map(item => (options.map(option =>((item.option_id === option.id && option.name==='size')))))?
                <Filter>
                   <FilterTitle style={{fontFamily:`${font}`}}>Size</FilterTitle>
                   <FilterSize style={{cursor:"pointer"}}   onChange={(e) => setVariant2(e.target.value)} >
                   <option value="none" selected disabled hidden>Select an Option</option>
                    {singleProduct.singleProduct.pvariant.map(item => (<FilterSizeOption   key={item.id} > {options.map(option =>((item.option_id === option.id && option.name==='size')? item.value : null))} </FilterSizeOption> )) }
                    </FilterSize>
                  </Filter> : <></>}
               </FilterContainer>
            
  
            <AddContainer>

              <AmountContainer >
                <Remove onClick= {()=>handelQauntity("dec")} style={{cursor:"pointer"}}/>
                <Amount style={{border:`2px solid ${primary}`}}>{quantity}</Amount>
                <Add onClick= {()=>handelQauntity("inc")} style={{cursor:"pointer"}} />
              </AmountContainer>
            {pvariant[0].quantity === 0?  <Error style={{fontFamily:`${font}`}}>PRODUCT IS OUT OF STOCK</Error> :<Button onClick={handleClick} style={{border:`2px solid ${primary}`,fontFamily:`${font}`}} >ADD TO CART</Button> }
              
            

            </AddContainer>
          </InfoContainer>

        </Wrapper>

        <Footer/>

      </Container>
    );



};

export default SingleProduct;