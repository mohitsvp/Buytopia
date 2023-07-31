import { Box, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
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
  }, [])

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
        <Box w="25%" p={5}>
          <Flex justifyContent={'space-between'}>
            <Box><Text as="b">Subtotal</Text></Box>
            <Box><Text>₹{total}</Text></Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart
