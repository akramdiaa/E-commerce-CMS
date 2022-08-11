import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../componants/Footer";
import { useParams} from "react-router-dom";
import Product from "../componants/Product";
import { TrinitySpinner} from 'loading-animations-react';
import { removeSingleCategory, showSingleCategory } from "../redux/singleCategoryRedux";
import Categories from "../componants/Categories";


const LoaddingContainer = styled.div`

position: absolute;
top: 20%;
left: 45%;
transform: translate(0, -50%);
padding: 10px;

height: 110px;
width: 110px;
`

const Container =styled.div`
  
`
const Wrapper = styled.div`
padding: 10px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

`;


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
color: black;
text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

`


const SpecificCategory = () => {

  const { categoryId } = useParams();
  const category = useSelector((state) => state.singleCategory);
  const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const fetchProducts = async (categoryId) => {
    setLoading(true)
      const response = await axios
        .get(`http://websitebuild.herokuapp.com/api/Customer/show-cat-Products/${categoryId}`, {headers:{shop:"remonshop"}})
        .catch((err) => {
          console.log("Err: ", err);
          setLoading(false)
        });
      dispatch(showSingleCategory(response.data.data));

      setLoading(false)
    };
    useEffect(() => {
      if (categoryId && categoryId !== "") fetchProducts(categoryId);
      return () => {
        dispatch(removeSingleCategory());
      };
    }, [categoryId]);


 

if(themeName ==="theme 1")
{
  return loading? <LoaddingContainer><TrinitySpinner color={`${secondry}`} /></LoaddingContainer> :(
    <Container>

      <Title style={{backgroundColor: `${secondry}`,color:`${primary}`,fontFamily:`${font}`}}></Title>
        <Wrapper>
       {category.singleCategory.map(item => (
         <Product item={item} key={item.id}/>
         ))}
         </Wrapper>
         <Title style={{backgroundColor: `${secondry}`,color:`${primary}`,fontFamily:`${font}`}}>about</Title>
       <Footer/>
       
    </Container>
  )}
else
{  return loading? <LoaddingContainer><TrinitySpinner color={`${secondry}`} /></LoaddingContainer> :(
  <Container>
    <Categories/>
      <Wrapper>
     {category.singleCategory.map(item => (
       <Product item={item} key={item.id}/>
       ))}
       </Wrapper>
     <Footer/>
     
  </Container>
)}

}

export default SpecificCategory