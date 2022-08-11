import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showUserInfo } from "../redux/loginRedux";


/////CSS for theme 1

const Container = styled.div`
margin:0;
padding:0;
width: 100%;
height: 95vh;

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
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
    
`;

const Wrapper = styled.div`
  border: 2px solid black;
  width: 40%;
  padding: 20px;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;  

  
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;

`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  width: 100%;
  margin: 0px 10px 0px -9px;
  padding: 10px;
  font-size: 20px;
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
 margin-left: 30%;
`;

const Indicator =styled.div`
    
    margin-top: 20px;
    margin-bottom: 0px;
    font-weight: bold;
    font-size: 20px;



`

const Error = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: bolder;
  margin: 5px;
  
`
///////////CSS for theme 2 

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 90vh;
  width: 30vw;
  margin-top: 20px;
  
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;

  text-transform: uppercase;
  letter-spacing: 0.4rem;

  position: absolute;

left: 35%;

`;

const WelcomeText = styled.h2`

  padding: 5px;
  margin: 50px;
  margin-top: 25px;
  margin-bottom: 15px;
  
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  padding: 200px;
  margin: 5px;
  margin-top: 0px;
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
  margin: 5px;
  backdrop-filter: blur(25px);
`;


const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
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
`;


const Profile = () => {
  const user = useSelector((state)=> state.user.currentUser);
  const userDetails = useSelector((state) => state.user.userInfo);
    const [first_name, setFirst_name] = useState(userDetails.first_name);
    const [second_name, setSecond_name] = useState(userDetails.second_name);
    const [email, setEmail] = useState(userDetails.email);
    const [address, setAddress] = useState(userDetails.address);
    const [phone_number, setPhone_number] = useState(userDetails.phone_number);
    const [city, setCity] = useState(userDetails.city);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)

  

    const editeUserInfo = async (w) => {
      w.preventDefault()
      setLoading(true)

      const response = await axios
        .post("http://websitebuild.herokuapp.com/api/Customer/editinfo",
        {first_name,second_name,email,address,phone_number,city},
        {headers:{shop:"remonshop", "auth-token":user}})
        .then((resp) => {
          dispatch(showUserInfo({first_name,second_name,email,address,phone_number,city}));
        })
        .catch((err) => {
          console.log("Err: ", err.response);
          setError(err.response.data.msg);
          setLoading(false)
        });
        
        
        setLoading(false)
    };
    //useEffect(() => {
    //}, [userDetails])




    if(themeName ==="theme 1")
    {    return loading? ("loading") : (
  
      <Container>
       
          <RigContainer>
         <Wrapper>
          <Title style={{fontFamily:`${font}`}}>{userDetails.first_name}'s PROFILE</Title>
            <Form>

            <Indicator style={{fontFamily:`${font}`}}>First name</Indicator>
              <Input style={{fontFamily:`${font}`}} value={first_name}  placeholder="First name" onChange={(e) =>{setFirst_name(e.target.value)}} />

            <Indicator style={{fontFamily:`${font}`}}>Last name</Indicator>
              <Input style={{fontFamily:`${font}`}} value={second_name} placeholder="Last name" onChange={(e) =>{setSecond_name(e.target.value)}}/>

            <Indicator style={{fontFamily:`${font}`}}>Email</Indicator>
              <Input style={{fontFamily:`${font}`}} value={email} placeholder="E-mail" onChange={(e) =>{setEmail(e.target.value)}} />

            <Indicator style={{fontFamily:`${font}`}}>Adress</Indicator>
              <Input style={{fontFamily:`${font}`}} value={address} placeholder="Address" onChange={(e) =>{setAddress(e.target.value)}} />

              <Indicator style={{fontFamily:`${font}`}}>Mobile Number</Indicator>
              <Input style={{fontFamily:`${font}`}} value={phone_number} placeholder="Mobile number" type="number" onChange={(e) =>{setPhone_number(e.target.value)}}/>

              <Indicator style={{fontFamily:`${font}`}}>City</Indicator>
              <Input style={{fontFamily:`${font}`}} value={city} placeholder="City" onChange={(e) =>{setCity(e.target.value)}}/>

              <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>
              <Button style={{fontFamily:`${font}`}} onClick={(e)=>{editeUserInfo(e);}}>Save</Button> 
            </Form>
         </Wrapper>
        </RigContainer>
      </Container>
  
    );}
    else
    { return loading? (" ") : (
  
      <MainContainer style={{background:`linear-gradient(to right, ${primary} 0%, ${secondry} 79%)`}}>
      <WelcomeText style={{fontFamily:`${font}`}}>{userDetails.first_name}'s PROFILE</WelcomeText>
      <InputContainer>
        <StyledInput style={{fontFamily:`${font}`}} value={first_name}  placeholder="First name" onChange={(e) =>{setFirst_name(e.target.value)}}/>
        <StyledInput style={{fontFamily:`${font}`}} value={second_name} placeholder="Last name" onChange={(e) =>{setSecond_name(e.target.value)}} />
        <StyledInput style={{fontFamily:`${font}`}} value={email} placeholder="E-mail" onChange={(e) =>{setEmail(e.target.value)}} />
        <StyledInput style={{fontFamily:`${font}`}} value={address} placeholder="Address" onChange={(e) =>{setAddress(e.target.value)}} />
        <StyledInput style={{fontFamily:`${font}`}} value={phone_number} placeholder="Mobile number" type="number" onChange={(e) =>{setPhone_number(e.target.value)}} />
        <StyledInput style={{fontFamily:`${font}`}} value={city} placeholder="City" onChange={(e) =>{setCity(e.target.value)}}/>
      </InputContainer>
      <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>

      <HorizontalRule  style={{background:`linear-gradient(to right, ${secondry} 0%, ${primary} 100%)`}}/>

      <ButtonContainer>
        <StyledButton onClick={(e)=>{editeUserInfo(e);}} style={{background:`linear-gradient(to right, ${secondry} 30%, ${primary} 80%)`,fontFamily:`${font}`}}>Save</StyledButton>
      </ButtonContainer>

      

    </MainContainer>
  
    );}

}

export default Profile