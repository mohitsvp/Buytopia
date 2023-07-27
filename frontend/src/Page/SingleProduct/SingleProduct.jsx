import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'

const SingleProduct = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios.get(`https://dummyjson.com/products/${id}`)
    .then((res) => {
      setProduct(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const addProduct = (item) => {
    setCart((prev) => [...prev, item] )
  }

  console.log(cart)

  if(!product) {
    return <p>Loading....</p>
  }

  return (
    <Box w="90%" m="auto">
      <Box>
          <Breadcrumb separator={<MdArrowForwardIos/>}>
              <BreadcrumbItem>
                  <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                  <Link to="/products">Products</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="/">{product.category}</BreadcrumbLink>
              </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <Flex gap={10}>
            <Box w="30%">
              <Box w="100%">
                  <Image src={product.images[0]} m="auto"/>
              </Box>
              <Flex my="10" gap={5}>
                {
                  product && product.images && product.images.map((image) => (
                    <Image src={image} key={image} h="100px" />
                  ))
                }
              </Flex>
            </Box>
            <Flex w="60%" flexDir={'column'} gap={2}>
              <Box>
                <Heading>{product.title}</Heading>
              </Box>
              <Box>
                ({product.rating})
              </Box>
              <Box>
                <Heading fontSize={'2xl'}>₹{product.price}</Heading>
              </Box>
              <Flex w="full" gap={5}>
                <Flex gap={5} border="1px solid black" w="15%" justifyContent={'space-evenly'} alignItems={'center'} borderRadius={'10px'}>
                  <Button bg="transparent" fontSize={'2xl'} isDisabled={quantity<=0 ? "disabled" : ""} onClick={() => {setQuantity((prev) => prev-1)}}>-</Button>
                  <Heading fontSize={'2xl'}>{quantity}</Heading>
                  <Button bg="transparent" fontSize={'2xl'} onClick={() => {setQuantity((prev) => prev + 1)}}>+</Button>
                </Flex>
                <Box>
                  {
                    product.stock > 0 ?  <Button bg="black" color="white" onClick={() => {addProduct(product)}}>Add to Cart</Button> : <Text>Item is out of stock</Text>
                  }
                </Box>
              </Flex>
              <Box>
                <Text>{product.description}</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
    </Box>
  )
}

export default SingleProduct



// {
//   "id": 3,
//   "title": "Samsung Universe 9",
//   "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
//   "price": 1249,
//   "discountPercentage": 15.46,
//   "rating": 4.09,
//   "stock": 36,
//   "brand": "Samsung",
//   "category": "smartphones",
//   "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
//   "images": [
//       "https://i.dummyjson.com/data/products/3/1.jpg"
//   ]
// }