import { Box, Flex, Image, SimpleGrid, Text} from '@chakra-ui/react'
import React from 'react'
import {BiLogoMastercard, BiLogoPaypal, BiLogoVisa} from "react-icons/bi"

import logo from "../../Assets/buytopia_logo.png"
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box w="full" h="350px" bg="#ebeef2" py={10}>
        <Flex w="95%" margin={'auto'} justifyContent={'space-evenly'}>
            <Box  w="20%"  my="30px">
                <NavLink to="/"><Image src={logo} w="50%"/></NavLink>
                <Box w="70%" m="20px 0"><Text>Specialised in providing high-quality, stylish products.</Text></Box>
            </Box>
            <Box w="40%">
                <SimpleGrid columns={3} spacing={10}>
                    <Box><Text as="b" fontSize={'20px'}>SHOP</Text></Box>
                    <Box><Text as="b" fontSize={'20px'}>COMPANY</Text></Box>
                    <Box><Text as="b" fontSize={'20px'}>SUPPORT</Text></Box>
                    <Box><Text>All Collections</Text></Box>
                    <Box><Text>About Us</Text></Box>
                    <Box><Text>FAQs</Text></Box>
                    <Box><Text>Winter Edition</Text></Box>
                    <Box><Text>Contact</Text></Box>
                    <Box><Text>Cookie Policy</Text></Box>
                    <Box><Text>Discount</Text></Box>
                    <Box><Text>Affilates</Text></Box>
                    <Box><Text>Term of Use</Text></Box>
                </SimpleGrid>
            </Box>
            <Box>
                <Box><Text as="b" fontSize={'20px'}>PAYMENT METHODS</Text></Box>
                <Flex gap={5} m="20px 0">
                    <Box><BiLogoMastercard size="50px"/></Box>
                    <Box><BiLogoVisa size="50px"/></Box>
                    <Box><BiLogoPaypal size="50px"/></Box>
                </Flex>
            </Box>
        </Flex>
        <Box width="95%" margin="20px auto">
            <hr/>
        </Box>
        <Box w="50%" m="auto" textAlign={'center'}>
            <Text>Copyright ©️ 2023. All right reserved</Text>
        </Box>
    </Box>
  )
}

export default Footer