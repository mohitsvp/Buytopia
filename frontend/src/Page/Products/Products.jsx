import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <Box w="90%" m="auto">
      <Box>
          <Breadcrumb separator={<MdArrowForwardIos/>}>
              <BreadcrumbItem>
                  <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="/">Products</BreadcrumbLink>
              </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex>
          <Box w="30%">
            
          </Box>
          <Box w="70%">
              <Flex justifyContent={'space-between'}>
                <Text>Showing 9 results from total 37 </Text>
                <Flex w="30%" justifyContent={'space-evenly'} alignItems={'center'} gap={2}>
                  <Text w="40%">Sort by</Text>
                  <Select>
                    <option value="">Popularity</option>
                    <option value="">Price high to low</option>
                    <option value="">Price low to high</option>
                  </Select>
                </Flex>
              </Flex>
          </Box>
        </Flex>
    </Box>
  )
}

export default Products