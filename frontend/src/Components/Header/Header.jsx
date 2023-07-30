import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../Assets/buytopia_logo.png"
import {AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai"
import { useAuth } from '../../Context/Auth/AuthContext'

const links = [
  {
    id : 1,
    path : "/about",
    title : "About"
  },
  {
    id : 2,
    path : "/products",
    title : "Shop"
  },
  {
    id : 3,
    path : "/contact",
    title : "Contact"
  }
]


const Header = () => {
  const {token, logout} = useAuth();
  return (
    <Flex justifyContent={'space-evenly'} alignItems={'center'} p="5" w="95%" m="auto" gap={10}>
      <Box  w="20%" ><NavLink to="/"><Image src={logo} margin={'auto'} w="70%"/></NavLink></Box>
      <Flex justifyContent={'space-evenly'} alignItems={'center'} w="30%" m="0 5%">
          {
            links.map((link) => (
              <NavLink key={link.id} to={link.path} ><Heading fontSize="2xl">{link.title}</Heading></NavLink>
            ))
          }
      </Flex>
      <Flex w="20%" border="1px solid black"  borderRadius={'20px'}>
        <InputGroup>
          <Input focusBorderColor='transparent' border="none"/>
          <InputRightElement>
            <Button variant={'none'} ><AiOutlineSearch/></Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex justifyContent={'space-evenly'} alignItems={'center'} w="10%" >
          <NavLink to="/cart"><Box fontSize={'30px'}><AiOutlineShoppingCart/></Box></NavLink>
          <Popover>
            <PopoverTrigger>
              <Box fontSize={'30px'}><AiOutlineUser/></Box>
            </PopoverTrigger>
            <PopoverContent textAlign={'center'} w="200px">
              <PopoverArrow/>
              <PopoverCloseButton/>
              <>
              {
                token !== null?
                <PopoverHeader cursor={'pointer'} onClick={() => logout()}>Log Out</PopoverHeader>
                :
                <>
                  <NavLink to="/login"><PopoverHeader>Sign In</PopoverHeader></NavLink>
                  <PopoverBody>
                    Hi 
                  </PopoverBody>                
                </>
              }
              </>
            </PopoverContent>
          </Popover>
      </Flex>
    </Flex>
  )
}

export default Header