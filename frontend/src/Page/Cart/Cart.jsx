import { Box, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const {token} = useAuth();

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

  console.log(cart);

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

              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box></Box>
      </Flex>
    </Box>
  )
}

export default Cart