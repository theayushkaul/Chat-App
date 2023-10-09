import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
// https://api.cloudinary.com/v1_1/dbsk8fd60/image/upload
const Signup = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // In chakraUi
  const toast = useToast();
  // Uploading the image
  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app")
      data.append("cloud_name", "dbsk8fd60")
      fetch("https://api.cloudinary.com/v1_1/dbsk8fd60/image/upload", {
        method: "post",
        body: data
      }).then((res) => res.json()).then(data => {
        setPic(data.url.toString())
      }).catch((err) => {
        console.log(err)
      })
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
    setLoading(false);
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords don't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      }
      const { data } = await axios.post("/api/user", { name:name, email:email, password:password, profilePic:pic }, config)
      console.log(pic)
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
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
        position: "bottom"
      })
      setLoading(false);
    }
  }

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder='Enter Your Name'
            onChange={(e) => setName(e.target.value)}
          >
          </Input>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show1 ? "text" : "password"}
              placeholder='Set Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow1(!show1)}>{show1 ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show2 ? "text" : "password"}
              placeholder='Confirm Your Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow2(!show2)}>{show2 ? "Hide" : "Show"}</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </div>
  )
}

export default Signup

