import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image, Select, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState();

  const fetchProducts = () => {
    axios.get("https://dummyjson.com/products")
    .then((res) => {
      console.log(res)
      setProducts(res.data.products)
    })
  }


  useEffect(() => {
    fetchProducts();
  }, [])

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
                <Text>Showing 9 results from total {products && products.length}</Text>
                <Flex w="30%" justifyContent={'space-evenly'} alignItems={'center'} gap={2}>
                  <Text w="40%">Sort by</Text>
                  <Select>
                    <option value="">Popularity</option>
                    <option value="">Price high to low</option>
                    <option value="">Price low to high</option>
                  </Select>
                </Flex>
              </Flex>
              <SimpleGrid columns={3} gap={10} m="50px 0">
                  {
                    products && products.map((product, index) => (
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <Box  boxShadow={'md'} p={5} borderRadius={'20px'} h="360px">
                          <Image src={product.images[0]} h="250px" w="full"/>
                          <Box m="20px 0">
                            <Flex justifyContent={'space-between'}>
                              <Box>
                                <Text>{product.title}</Text>
                              </Box>
                              <Box>
                                <Text as="b">₹{product.price}</Text>
                              </Box>
                            </Flex>
                            <Flex></Flex>
                          </Box>
                        </Box>
                      </Link>
                    ))
                  }
              </SimpleGrid>
          </Box>
        </Flex>
    </Box>
  )
}

export default Products