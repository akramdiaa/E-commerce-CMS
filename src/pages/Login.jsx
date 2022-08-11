import styled from "styled-components";
import {
   Link
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  loginSuccess } from "../redux/loginRedux";
import toast, { Toaster } from 'react-hot-toast';


///////CSS for theme 1

const Container = styled.div`
  width: 100%;
  height: 94vh;
`;

const RigContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      rgba(240, 240, 240, 0),
      rgba(0, 0, 0, .9)
    ),
    url("https://wallpaperaccess.com/full/828886.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;  
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-weight:bold;
  
`;

const Form = styled.form`
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
 
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  width: 100%;

`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  font-weight:bold;
  border: 2px solid black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.5s ease ;
  &:hover{
     background-color: rgba(0,0,0,0.6);
     
  }

`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`

const RestLink = styled.a`
  margin: 5px 0px;
  font-size: 18px;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer;
 color: black;
`;

const Error = styled.div`
  color: red;
  text-decoration: underline;
  font-weight: bolder;
  margin: 5px;
`
/////////////CSS for theme 2 


const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 60vh;
  width: 30vw;
  margin-top: 40px;

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
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
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
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;



const ForgotPassword = styled.h4`
  cursor: pointer;
  margin-bottom: 20px;
  color: white;
`;



const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  margin: 10px;
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




const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const user = useSelector((state)=> state.user.currentUser)
    const {themeName, primary , secondry,font} = useSelector((state)=> state.theme)
    const dispatch = useDispatch();
    const LoginAlert = () => toast('Login Successful');


    const fetchUserInfo = async (w) => {
      w.preventDefault();
      setLoading(true);
      const response = await axios
        .post("https://websitebuild.herokuapp.com/api/auth-customer/login",{email,password},{headers:{shop:"remonshop"}})
        .catch((err) => {
          console.log("Err: ", err.response);
          setError(err.response.data.msg)
          setLoading(false)
        });
        setSuccess(true)
      dispatch(loginSuccess(response.data.data.token));
      
      LoginAlert();
     
    };

    useEffect(() => {
      
    }, [user])
    
 


  
  
    if(themeName ==="theme 1")
    {  return  (



      <Container>
       <Toaster />
        <RigContainer>
        <Wrapper>
          <Title style={{fontFamily:`${font}`}}>LOGIN</Title>
          <Form>
            <Input style={{fontFamily:`${font}`}} value={email} placeholder="E-mail" onChange={(e) =>{setEmail(e.target.value)}}/>
            <Input  value={password}  placeholder="password" type="password" style={{ letterspacing: "0.125em",fontFamily:`${font}`}}  onChange={(e) =>{setPassword(e.target.value)}}/>
            <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>
        
            <Button style={{fontFamily:`${font}`}} onClick={(e)=>{fetchUserInfo(e)}  }>LOGIN</Button> 
    
          </Form>
          <LinkContainer> 
            <Link to="/ResetPassword" style={{textDecoration:"none"}} > <RestLink style={{fontFamily:`${font}`}}>Rest Password</RestLink>   </Link> 
          <Link to="/Register" style={{textDecoration:"none"}} > <RestLink style={{fontFamily:`${font}`}}>Create Acount</RestLink> </Link>
            </LinkContainer>
        </Wrapper>
      </RigContainer>
      </Container>
  
    );}
    else
    {  return  (



      <MainContainer style={{background:`linear-gradient(to right, ${secondry} 0%, ${primary} 79%)`}}>
      <WelcomeText style={{fontFamily:`${font}`}}>Login</WelcomeText>
      <InputContainer>
        <StyledInput style={{fontFamily:`${font}`}} type="text" placeholder="Email" value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
        <StyledInput  type="password" placeholder="Password" value={password} style={{ letterspacing: "0.125em",fontFamily:`${font}`}}  onChange={(e) =>{setPassword(e.target.value)}} />
      </InputContainer>
      <Error style={{fontFamily:`${font}`}}>{error!==""? (error):undefined}</Error>
      <ButtonContainer>
        <StyledButton onClick={(e)=>{fetchUserInfo(e)}}  style={{background:`linear-gradient(to right, ${primary} 30%, ${secondry} 80%)`,fontFamily:`${font}`}}>Login</StyledButton>
      </ButtonContainer>

      <HorizontalRule  style={{background:`linear-gradient(to right, ${primary} 0%, ${secondry} 100%)`,fontFamily:`${font}`}}/>
      <Link to="/ResetPassword" style={{textDecoration:"none"}} >  <ForgotPassword style={{fontFamily:`${font}`}}>Forgot Password ?</ForgotPassword></Link> 
      <Link to="/Register" style={{textDecoration:"none"}} ><ForgotPassword style={{fontFamily:`${font}`}}>Need An Account ?</ForgotPassword></Link> 
    </MainContainer>
  
    );}

};

export default Login;