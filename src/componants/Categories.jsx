import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showCategories } from "../redux/categoriesRedux";
import CategoryItem from './CategoryItem';
import { TrinitySpinner} from 'loading-animations-react';


const LoaddingContainer = styled.div`
position: absolute;
top: 20%;
left: 45%;
transform: translate(0, -50%);
padding: 10px;
height: 110px;
width: 110px;
`


//////CSS for theme 1
const Container = styled.div`
display: flex;
justify-content: center;
`;

//////CSS for theme 2 
const Container_2 = styled.div`
display: flex;
padding: 10px 10vw;
justify-content: center;
border-top: 2px solid black;
opacity: 0.8;
`;



const Categories = () => {
    const [loading, setLoading] = useState()
    const listCategories = useSelector((state) => state.categories);
    const {themeName, primary , secondry} = useSelector((state)=> state.theme)
    const dispatch = useDispatch();
    const fetchCategories = async () => {
      setLoading(true)

      const response = await axios
        .get('https://websitebuild.herokuapp.com/api/Customer/show-cat/',{headers:{shop:"remonshop"}})
        .catch((err) => {
          console.log("Err: ", err);
        });
      dispatch(showCategories(response.data.data));
      setLoading(false)
    };

    useEffect(() => {
    fetchCategories();
    }, []);


    if(themeName ==="theme 1")
      {return loading ? <LoaddingContainer><TrinitySpinner color={`${secondry}`} /></LoaddingContainer> : (
        <Container>
            {listCategories.categories.map(item=>(
                <CategoryItem item={item} key={item.id}/> 
            ))}
        </Container>
        )
    }
    else
    {
      return loading ?  <LoaddingContainer><TrinitySpinner color={`${secondry}`} /></LoaddingContainer> : (
        <Container_2 style={{backgroundColor: `${primary}`}}>
            {listCategories.categories.map(item=>(
                <CategoryItem item={item} key={item.id}/> 
            ))}
        </Container_2>
        )

    }
}
export default Categories