import { Box, Button, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, calc } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const {token} = useAuth();
  const [total, setTotal] = useState(0);

  const fetchCart = () => {
    const config = {
      headers : {Authorization: 'Bearer ' + token}
    }
    if(token !== null) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart`, config)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() => {
    fetchCart();
  }, [token])


  useEffect(() => {
    let calculatedPrice = 0;

    cart.forEach((item) => {
      const subTotal = item.product.price * item.quantity;
      const discount = (item.product.discountPercentage / 100)*subTotal;
      calculatedPrice += subTotal - discount
    })

    setTotal(calculatedPrice)

  }, [cart])

  return (
    <Box w="90%" m="auto">
      <Flex>
        <Box w="70%">
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                  {
                    cart && cart.map((item) => (
                      <Tr key={item._id}>
                        <Td><Image src={item.product.thumbnail} h="100px" w="150px"/></Td>
                        <Td>{item.quantity}</Td>
                        <Td>₹{item.product.price}</Td>
                      </Tr>
                    ))
                  }
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box w="20%" p={5} m="20px auto" boxShadow={'lg'} fontSize={'20px'}>
          {
            cart.map(item => (
              <>
                <Flex justifyContent={'space-between'} mb="10px">
                  <Box><Text as="b" color="grey">Subtotal</Text></Box>
                  <Box><Text as="b">₹{item.product.price * item.quantity}</Text></Box>
                </Flex>
                <Flex justifyContent={'space-between'} mb="10px">
                    <Box><Text as="b" color="grey">Discount</Text></Box>
                    <Box><Text>₹{((item.product.price * item.product.discountPercentage)/100)*item.quantity}</Text></Box>
                </Flex>
                <hr/>
                <Flex justifyContent={'space-between'} mt="20px" mb="10px">
                  <Box><Text as="b" color="grey">Total</Text></Box>
                  <Box><Text as="b">₹{total}</Text></Box>
                </Flex>
              </>
            ))
          }
          <Box textAlign={'center'} mt="20px"><Button w="full" bg="black" color="white">CHECKOUT</Button></Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart
