import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//////////CSS theme 1
const Container = styled.div`
  flex: 1;
  margin: 1px;
  height: 20vh;
  max-width: 15vw ;
  position: relative;


`;



const Info = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const Title = styled.h1`
    color:black;
    margin-bottom: 20px;
`;



const Button = styled.button`
border-style: hidden ;
border-radius: 10px;
padding: 10px;

border: 1px solid black;
cursor: pointer;
font-weight: bolder;
font-size: 20px;
transition: 1s ease;

&:hover {
transform:scale(1.2);
transition: 0.5s ease;
}
`;

//////////CSS theme 2

const Container_2 = styled.div`


`;

const Wrapper = styled.div`
text-transform: capitalize;
padding: 0 10px;
margin: 0 5px;
text-decoration: none;
transition: 0.5s;
font-weight: bold;
&:hover
{
  opacity: 1;
  transform: scale(1.4);
}
cursor: pointer;

`;



const CategoryItem = ({item}) => {
  
  const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)

  if(themeName ==="theme 1")
  {  return (
    <Container>
            <Info>
                <Title style={{fontFamily:`${font}`}}> {item.name} </Title>
               <Link to={  `/Category/${item.id}`  } >
               <Button style={{backgroundColor: `${secondry}` , color: `${primary}` }}> Check Category  </Button>
               </Link>

            </Info>
        
    </Container>
  )}
  else
  {  return (
    <Container_2 >
      <Wrapper>
      <Link to={ `/Category/${item.id}` } style={{textDecoration:"none",color: `${secondry}`,fontFamily:`${font}`}} >{item.name}</Link>
      </Wrapper>
    </Container_2>
  )}

}


export default CategoryItem