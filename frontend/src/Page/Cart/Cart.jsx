import { Box, Button, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, calc } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth/AuthContext';
import { Link } from 'react-router-dom';

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


  const handleProductQuantity = async (item, value) => {
    const newQuantity = item.quantity + value;

    if (newQuantity <= 0) {
      // Remove the item from the cart
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/${item._id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        fetchCart();
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    } else {
      // Update item quantity
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/cart/${item._id}`,
          { quantity: newQuantity },
          { headers: { Authorization: 'Bearer ' + token } }
        );
        fetchCart();
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    }
  }

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
                        <Td>
                          <Flex alignItems={'center'} gap={2} border="1px solid #eee" w="30%" borderRadius={'lg'} fontSize={'lg'}>
                            <Button  colorScheme="white" color="black"><Text fontSize={'2xl'} onClick={() => handleProductQuantity(item, -1)}>-</Text></Button>
                            <Box as="b">
                              {item.quantity}
                            </Box>
                            <Button colorScheme="white" color="black"><Text fontSize={'2xl'} onClick={() => handleProductQuantity(item, 1)}>+</Text></Button>
                          </Flex>
                          </Td>
                        <Td><Text as="b" fontSize={'2xl'}>₹{item.product.price}</Text></Td>
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
              <React.Fragment key={item._id}>
                <Flex justifyContent={'space-between'} mb="10px">
                  <Box><Text as="b" color="grey">Subtotal</Text></Box>
                  <Box><Text as="b">₹{(item.product.price * item.quantity).toFixed(2)}</Text></Box>
                </Flex>
                <Flex justifyContent={'space-between'} mb="10px">
                    <Box><Text as="b" color="grey">Discount</Text></Box>
                    <Box><Text>₹{(((item.product.price * item.product.discountPercentage)/100)*item.quantity).toFixed(2)}</Text></Box>
                </Flex>
                <hr/>
              </React.Fragment>
            ))
          }
            <Flex justifyContent={'space-between'} mt="20px" mb="10px">
              <Box><Text as="b" color="grey">Total</Text></Box>
              <Box><Text as="b">₹{total.toFixed(2)}</Text></Box>
            </Flex>
          <Link to="/checkout"><Box textAlign={'center'} mt="20px"><Button w="full" bg="black" color="white">CHECKOUT</Button></Box></Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart
