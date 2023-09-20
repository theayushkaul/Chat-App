import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
const Login = () => {
  const [show1,setShow1] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();
  let navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <VStack spacing="5px">
        <FormControl  id="email" isRequired>
          <FormLabel>Email</FormLabel>
            <Input
            placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            />
        </FormControl>
        <FormControl  id="passowrd" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input
          type={show1 ? "text" : "password"}
            placeholder='Set Your Password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            />
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>setShow1(!show1)}>{show1 ? "Hide": "Show"}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        isLoading={loading}
      >
        Get Guest User Credentials
      </Button>
      </VStack>
    </div>
  )
}

export default Login
