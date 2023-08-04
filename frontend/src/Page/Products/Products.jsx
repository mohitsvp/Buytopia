import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, Flex, Image, Select, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`)
    .then((res) => {
      setProducts(res.data)
    })
  }

  const fetchCategory = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
    .then((res) => {
      setCategory(res.data);
    })
    .catch((err) => {
      console.error("Error getting the categories", err)
    })
  }

  const fetchBrand = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/brand`)
    .then((res) => {
      setBrand(res.data);
    })
    .catch((err) => {
      console.error("Error getting the brands", err)
    });
  }

  const applyFilters = () => {
    const filters = {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      discounts: selectedDiscounts,
    };

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`, { params: filters })
      .then((res) => {
        setProducts(res.data);
      });
  };


  const handleBrandsFilter = (brandId) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

 

  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    fetchCategory();
  }, [])

  useEffect(() => {
    fetchBrand();
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
        <Flex gap={10} mt={4}>
          <Box w="20%">
              <Stack>
                <Accordion allowToggle defaultIndex={[0]}>
                  <AccordionItem>
                    <Text>
                      <AccordionButton>
                        <Box as="span" flex={1} textAlign={'left'}>
                          Category
                        </Box>
                        <AccordionIcon/>
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                        <Flex>
                          {
                            category.map((item) => (
                              <Box key={item._id}>
                                <Checkbox onChange={() => handleCategoryFilter(item._id)} isChecked={selectedCategories.includes(item._id)}>{item.name}</Checkbox>
                              </Box>
                            ))
                          }
                        </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text>
                      <AccordionButton>
                        <Box as="span" flex={1} textAlign={'left'}>
                          Brand
                        </Box>
                        <AccordionIcon/>
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                        <Flex>
                          {
                            brand.map((item) => (
                              <Box key={item._id}>
                                <Checkbox onChange={() => handleBrandsFilter(item._id)} isChecked={selectedBrands.includes(item._id)}>{item.name}</Checkbox>
                              </Box>
                            ))
                          }
                        </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                        <Text>
                          <AccordionButton>
                            <Box as="span" flex={1} textAlign={'left'}>
                              Price
                            </Box>
                          <AccordionIcon/>
                          </AccordionButton>
                        </Text>
                        <AccordionPanel pb={4}>
                          <Slider>
                            <SliderTrack>
                              <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb/>
                          </Slider>
                        </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                        <Text>
                          <AccordionButton>
                            <Box as="span" flex={1} textAlign={'left'}>
                              Rating
                            </Box>
                          <AccordionIcon/>
                          </AccordionButton>
                        </Text>
                        <AccordionPanel pb={4}>
                          <Slider defaultValue={3} min={0} max={5}>
                            <SliderTrack>
                              <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb/>
                          </Slider>
                        </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Text>
                      <AccordionButton>
                        <Box as="span" flex={1} textAlign={'left'}>
                          Discount
                        </Box>
                        <AccordionIcon/>
                      </AccordionButton>
                    </Text>
                    <AccordionPanel> 
                          <Stack>
                            <Box>
                              <Checkbox>Above 50%</Checkbox>
                            </Box>
                            <Box>
                              <Checkbox>30% - 50%</Checkbox>
                            </Box>
                            <Box>
                              <Checkbox>10% - 30%</Checkbox>
                            </Box>
                            <Box>
                              <Checkbox>Below 10%</Checkbox>
                            </Box>
                          </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Button bg="black" onClick={applyFilters} color={'white'}>
                  Apply Filters
                </Button>
              </Stack>
          </Box>
          <Box w="80%">
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
                      <Link to={`/product/${product._id}`} key={product._id}>
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