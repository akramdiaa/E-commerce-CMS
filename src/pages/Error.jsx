import React from 'react'
import styled from 'styled-components'
import Footer from '../componants/Footer';
import Navbar from '../componants/Navbar';


const Container = styled.div`
  

`;

const Wrapper = styled.div`
  
  padding: 20px;
  margin-bottom: 25%;
  display: flex; 
  align-items: center;
  justify-content: center;
 
`;

const Error = () => {
  const {font} = useSelector((state)=> state.theme)
  return (
    <Container>
      


        <Wrapper style={{fontWeight: "bold", fontSize:"30px",fontFamily:`${font}`}}>

          Page not found

       </Wrapper>


      <Footer/>
    </Container>
  )
}

export default Error