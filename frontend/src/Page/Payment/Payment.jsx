import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Radio, RadioGroup, Stack, Text,  } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth/AuthContext';
import { Link } from 'react-router-dom';
import {IoIosArrowDown} from "react-icons/io"

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const {token} = useAuth();
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shipmentCost, setShipmentCost] = useState(0);
    const [upivalue, setUPIValue] = React.useState('googlePay')

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


  return (
    <Box  w="90%" m="auto" >
        <Flex my="50px" gap={10}>
            <Box w="70%" p={5} borderRadius={'md'} border="1px solid #eee">
                <Flex flexDirection={'column'} gap={5}>
                    <Box><Heading>Select Payment Method</Heading></Box>
                    <Box>
                        <Accordion allowToggle defaultIndex={[0]}>
                            <AccordionItem>
                                <Text>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign={'left'}>
                                            Credit Card
                                        </Box>
                                        <AccordionIcon/>
                                    </AccordionButton>
                                </Text>
                                <AccordionPanel pb={4}>
                                    <Flex flexDirection={'column'} gap={2}>
                                        <Input placeholder='Card Number' type="number"/>
                                        <Input placeholder='Name on Card'/>
                                        <Flex gap={2}>
                                            <Input placeholder='Expiration Date (MM/YY)' type="number"/>
                                            <Input placeholder='CVV' type="password"/>
                                        </Flex>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <Text>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign={'left'}>
                                            UPI
                                        </Box>
                                        <AccordionIcon/>
                                    </AccordionButton>
                                </Text>
                                <AccordionPanel pb={4}>
                                    <RadioGroup onChange={setUPIValue} value={upivalue}>
                                        <Stack direction={'row'}>
                                            <Radio value="googlePay">Google Pay</Radio>
                                            <Radio value="phonePe">Phone Pe</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <Text>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign={'left'}>
                                            Debit Card
                                        </Box>
                                        <AccordionIcon/>
                                    </AccordionButton>
                                </Text>
                                <AccordionPanel pb={4}>
                                    <Flex flexDirection={'column'} gap={2}>
                                        <Input placeholder='Card Number' type="number"/>
                                        <Input placeholder='Name on Card'/>
                                        <Flex gap={2}>
                                            <Input placeholder='Expiration Date (MM/YY)' type="number"/>
                                            <Input placeholder='CVV' type="password"/>
                                        </Flex>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
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
                    <Box>
                        <Button w="full" color="white" bg="black">Pay</Button>
                    </Box>
                </Box>
        </Flex>
    </Box>
  )
}

export default Checkout