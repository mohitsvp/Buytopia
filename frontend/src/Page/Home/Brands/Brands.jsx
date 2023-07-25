import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import {TbBrandSafari, TbBrandShazam, TbBrandShopee, TbBrandSkype, TbBrandSlack, TbBrandSpeedtest, TbBrandSpotify, TbBrandStripe} from "react-icons/tb"

const brandsIcon = [
  TbBrandShazam, TbBrandShopee, TbBrandSkype, TbBrandSlack, TbBrandSpotify, TbBrandStripe, TbBrandSpeedtest, TbBrandSafari
]

const Brands = () => {
  return (
    <Box w="90%" m="auto">
      <Heading>Brands</Heading>
      <Flex p={2} m="30px auto" w="90%" justifyContent={'space-around'}>
        {
          brandsIcon.map((BrandIcon, index) => (
            <BrandIcon size={80} color="#4b5a6d" key={index}/>
          ))
        }
      </Flex>
    </Box>
  )
}

export default Brands