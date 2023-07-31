import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos, MdStar } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { useAuth } from '../../Context/Auth/AuthContext';


const SingleProduct = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState({});
  const {token} = useAuth();
  const navigate = useNavigate();

  console.log(token)
  
  const config = {
    headers : {Authorization: 'Bearer ' + token}
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
    .then((res) => {
      setProduct(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const addProduct = (item) => {
    if(token === null) {
      navigate("/login")
    } 
    else{
      const updatedCart = {
        product : item._id,
        quantity
      }
  
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, updatedCart, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    } 
  }

  if(!product) {
    return <p>Loading....</p>
  }

  const fullStars = Math.floor(product.rating);
  const partialStar = product.rating - fullStars;


  const settings = {
    className: "left",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
  };

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
                  <BreadcrumbLink href="/">{product.category[0].name}</BreadcrumbLink>
              </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <Flex gap={10}>
            <Box w="30%">
              <Box w="100%">
                  <Image src={product.images[0]} m="auto"/>
              </Box>
              <Slider {...settings}>
                {
                  product && product.images && product.images.map((image, index) => (
                    <Box key={image}>
                      <Image src={image}  h="100px" />
                    </Box>
                  ))
                }

              </Slider>
              <Flex my="10" gap={5}>
              </Flex>
            </Box>
            <Flex w="60%" flexDir={'column'} gap={2}>
              <Box>
                <Heading>{product.title}</Heading>
              </Box>
              <Flex gap={5}>
                <Flex fontSize={'2xl'}>
                  {
                    [...Array(fullStars)].map((_, index) => (
                      <MdStar key={index} color="gold"/>
                    ))
                  }

                  {
                    partialStar > 0 && (
                      <MdStar color="gold"
                      style={{ clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
                      />
                    )
                  }
                </Flex>
                ({product.rating})
              </Flex>
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



