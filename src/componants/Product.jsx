import {  SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import SingleProduct from "../pages/SingleProduct";


//////////////CSS for theme 1
const Info = styled.div`

width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2)  ;
opacity: 0;
z-index: 3;
display: flex;
align-items: center;
justify-content: center;

transition: all 0.5s ease;
cursor: pointer;
`;

const Container = styled.div`
flex :1;
margin: 5px;
width: auto;
min-width: 280px;
max-width: 350px;
height: 350px;
display: flex;
justify-content: center;
align-items: center;
position: relative;

transition: 500ms;
&:hover ${Info}{
    opacity: 1;

}
&:hover {
    opacity: 1;
    margin: 50px;
    transform: scale(1);
    transition: 500ms;
}
`;


const Image = styled.img`
  height: 300px;
  width: 100%;
  
  object-fit: contain;
`;




const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease ;
margin-top: 200px;
&:hover{
    transform: scale(1.4);
}
`;

const Price = styled.div`
    font-weight: bold;
    font-size: 30px;
    margin-top: 200px;
    margin-right: 30px;
    padding: 10px;
    border-radius: 10px;
    
    opacity: 0.7;
    color: white;
`
//////////////CSS for theme 2
const  Container_2 = styled.div`
padding-left: 40px;
margin: 10px;
display : flex ;
align-items: center;
justify-content: center;
overflow-x: auto;
scroll-behavior: smooth;

::-webkit-scrollbar
{
    display: none;
};


`;

const ProductCard = styled.div`
flex: 0 0 auto ;
width: 300px ;
height: 500px ;
margin-right: 40px;

`;

const Image_2 = styled.img`
position: relative;
width: 100%;
height: 350px;
overflow: hidden;

`;

const Info_2 = styled.div`
width : 100%;
height : 100px;
padding-top : 10px;
`;

const ProductName = styled.h2`
text-transform : uppercase;
`;

const Price_2 = styled.span`
font-weight: 900;
font-size: 20px;
`

const Button = styled.div`

width: 150px;
height:40px;
padding: 2px;
display: flex;
align-items: center;
justify-content: center;
transition: 500ms;

&:hover {
    opacity: 1;
    transform: scale(1.1);
    transition: 500ms;
}
`;

const Product = ({item}) => {
    const {themeName, primary , secondry} = useSelector((state)=> state.theme)

    if(themeName ==="theme 1")
    {  return (

        <Container >
            
            <Image src={item.ProductImage}/>
            <Info>
                    <Price style={{backgroundColor: `${primary}` , borderColor:`${secondry}`, border:`solid ${secondry}`}} >
                    {item.price} LE
                    </Price> 
                <Link to={`/Product/${item.id}`  }>
                <Icon  style={{backgroundColor: `${primary}` , borderColor:`${secondry}`, border:`solid ${secondry}`,color:`${secondry}`}}>
                    <SearchOutlined/>
                </Icon>
                </Link> 
            </Info>
           
        </Container>
      )}
    else
    {  return (

        <Container_2 >

            <ProductCard>
                <Image_2 src={item.ProductImage}/>

                <Info_2>
                    <ProductName>{item.name}</ProductName>

                        <Price_2>{item.price} LE</Price_2> 

                    <Link to={`/Product/${item.id}` } style={{textDecoration:"none"}}>

                    <Button  style={{backgroundColor: `${secondry}` , borderColor:`${primary}`, border:`solid `,color:`${primary}`}}>
                        Check Product
                    </Button>

                    </Link> 
                </Info_2>

            </ProductCard>

           
        </Container_2>
      )}

}

export default Product