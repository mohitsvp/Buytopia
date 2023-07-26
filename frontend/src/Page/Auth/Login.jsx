import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Image, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdArrowForwardIos} from "react-icons/md"
import authImage from "../../Assets/auth_image.jpg"
import axios from "axios"

const Login = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prevData) => ({...prevData, [name] : value}))    
    }


    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {formData})
        .then((res) => {
            toast({
                title : "Login success",
                status : "success",
                duration : 3000,
                isClosable : true,
                position : "top-right"
            })
            navigate("/")
        })
        .catch((err) => {
            toast({
                title : err.request.response,
                status : "error",
                duration : 3000,
                isClosable : true
            })
        })
        setFormData({
            email : "",
            password : ""
        })
    }

  return (
    <Box w="90%" m="auto">
        <Box>
            <Breadcrumb separator={<MdArrowForwardIos/>}>
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/">Login</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Box>
        <Flex w="90%" m="auto" gap={5} >
            <Box w="50%">
                <Image src={authImage}/>
            </Box>
            <Box w="50%" m="20px" boxShadow={'base'}  p={10} margin="30px">
                <Heading textAlign={'center'}>Login</Heading>
                <VStack margin="20px auto" gap={5}>
                    <Input placeholder='Enter Email Address' onChange={handleChange} name="email" value={formData.email}/>
                    <Input type="password" placeholder='Enter Password' onChange={handleChange} name="password" value={formData.password}/>
                    <Button fontSize={'2xl'} bg={'teal.500'} color ="white" w="50%" p="5" onClick={handleSubmit}>Login</Button>
                </VStack>
                <Box textAlign={'center'}>
                    <Text as="b" >Visiting for first time please <Link to="/register"><Text as="u" color="blue">register</Text></Link> here </Text>
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default Login