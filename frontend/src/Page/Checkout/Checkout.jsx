import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Text,  } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth/AuthContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const {token} = useAuth();
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipmentCost, setShipmentCost] = useState(0);
    const [address, setAddress] = useState({
        name : "",
        number : "",
        street : "",
        state : "",
        city : "",
        pinCode : ""
    });

    useEffect(() => {
        fetchCart();
    }, [token])


    useEffect(() => {
    
        let newSubTotal = 0;
        let newDiscount = 0;
    
        cart.forEach((item) => {
            newSubTotal += item.product.price * item.quantity;
            newDiscount += (item.product.discountPercentage * item.product.price * item.quantity) / 100;
        });
    
        let newShipmentCost = 0;
        if (newSubTotal <= 2000) {
            newShipmentCost = 40;
        }
    
        let newTotal = newSubTotal - newDiscount + newShipmentCost;
    
        setSubTotal(newSubTotal);
        setDiscount(newDiscount);
        setShipmentCost(newShipmentCost);
        setTotal(newTotal);
    
    
      }, [cart])

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

      const handleAddressChange = (event) => {
        const {name, value} = event.target;
        setAddress((prevValue) => ({...prevValue, [name] : value}));
      }

      const handleAddressSubmit = () => {
        localStorage.setItem("Address", JSON.stringify(address))
      }


  return (
    <Box  w="90%" m="auto" >
        <Flex my="50px" gap={10}>
            <Box w="70%" p={5} borderRadius={'md'} border="1px solid #eee">
                <Flex flexDirection={'column'} gap={5}>
                    <Box><Heading>Basic details</Heading></Box>
                    <Flex gap={5}>
                        <Box w="70%">
                            <FormControl>
                                <FormLabel>Full Name *</FormLabel>
                                <Input type="text" placeholder='Enter your Full Name' name="name" value={address.name} onChange={handleAddressChange}/>
                            </FormControl>
                        </Box>
                        <Box w="30%">
                            <FormControl>
                                <FormLabel>Phone Number *</FormLabel>
                                <Input type="number" placeholder='Enter your Number' name="number" value={address.number} onChange={handleAddressChange}/>
                            </FormControl>
                        </Box>
                    </Flex>
                    <Box><Heading>Address</Heading></Box>
                    <FormControl>
                        <FormLabel>Street Name / Locality *</FormLabel>
                        <Input placeholder='Enter your Street Name / Locality' name="street" value={address.street} onChange={handleAddressChange}/>
                    </FormControl>
                    <Flex gap={5}>
                        <Box w="50%">
                            <FormControl>
                                <FormLabel>State *</FormLabel>
                                <Input placeholder='State' name="state" value={address.state} onChange={handleAddressChange}/>
                            </FormControl>        
                        </Box>
                        <Box w="50%">
                            <FormControl>
                                <FormLabel>City *</FormLabel>
                                <Input placeholder='City' name="city" value={address.city} onChange={handleAddressChange}/>
                            </FormControl>
                        </Box>
                    </Flex>
                    <Box>
                        <FormControl>
                            <FormLabel>Pin Code</FormLabel>
                            <Input type="number" placeholder='Pin Code' name="pinCode" value={address.pinCode} onChange={handleAddressChange}/>
                        </FormControl>
                    </Box>
                </Flex>
            </Box>
            <Box w="30%" p={5} borderRadius={'md'} border="1px solid #eee">
                <Box><Heading>Your Order</Heading></Box>
                <Box my={5}>
                    {
                        cart.map((item) => (
                            <Flex key={item._id} justifyContent={'space-between'} my={5}>
                                <Flex gap={5}>
                                    <Box>
                                        <Image src={item.product.thumbnail} w="100px" h="100px"/>
                                    </Box>
                                    <Box>
                                        <Text>{item.product.title}</Text>
                                        <Text>X {item.quantity}</Text>
                                    </Box>
                                </Flex>
                                <Box>
                                    <Text fontSize={'xl'} as="b">₹ {item.product.price * item.quantity}</Text>
                                </Box>
                            </Flex>
                        ))
                    }
                </Box>
                <hr/>
                <Box my={5}>
                    <Box>
                        <Text>Discounted Code</Text>
                    </Box>
                    <Flex gap={2}>
                        <Box>
                            <Input/>
                        </Box>
                        <Box>
                            <Button colorScheme='white' color="black" border="1px solid #eee"><Text>Apply</Text></Button>
                        </Box>
                    </Flex>
                </Box>
                <hr/>
                <Flex flexDirection={'column'} gap={2} my={5}>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text>Subtotal</Text>
                        </Box>
                        <Box>
                            <Text>₹ {subTotal.toFixed(2)}</Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text>Discount</Text>
                        </Box>
                        <Box>
                            <Text>₹ {discount.toFixed(2)}</Text>
                        </Box>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text>Shipment Cost</Text>
                        </Box>
                        <Box>
                            <Text>₹ {shipmentCost.toFixed(2)}</Text>
                        </Box>
                    </Flex>
                    <hr/>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text>Grand Total</Text>
                        </Box>
                        <Box>
                            <Text>₹ {total.toFixed(2)}</Text>
                        </Box>
                    </Flex>
                </Flex>
                <hr/>
                <Box>

                </Box>
                <Link to="/payment">
                    <Box>
                        <Button w="full" color="white" bg="black" onClick={handleAddressSubmit}>Continue to Payment</Button>
                    </Box>
                </Link>
            </Box>
        </Flex>
    </Box>
  )
}

export default Checkout