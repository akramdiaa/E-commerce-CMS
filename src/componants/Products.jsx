import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Product from "./Product";
import { showProducts } from "../redux/productsRedux";


const Container = styled.div`
padding: 10px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

`;

const Container_2= styled.section`
position : relative;
display: flex;
flex-wrap: wrap;
overflow : hidden;
padding : 20px 0;


`;



const Products = () => {

  const [loading, setLoading] = useState()
  const {themeName} = useSelector((state)=> state.theme)
  const products = useSelector((state) => state.products);
  const listproducts = products;
  const dispatch = useDispatch();
    
    const fetchProducts = async () => {
      setLoading(true)

      const response = await axios
        .get('http://websitebuild.herokuapp.com/api/Customer/show-all-products',{headers:{shop:"remonshop"}})
        .catch((err) => {
          console.log("Err: ", err);
          setLoading(false)
        });

        
        dispatch(showProducts(response.data.data));

      setLoading(false)
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    if(themeName ==="theme 1")
    {  return loading ? ('LOADING') : (
      <Container>
        
           {listproducts.products.map(item => (
              <Product item={item} key={item.id}/>
          ))} 
      </Container>
    )}
    else
    {  return loading ? ("") : (
      <Container_2>
           {listproducts.products.map(item => (
              <Product item={item} key={item.id}/>
          ))} 
      </Container_2>
    )}

}

export default Products