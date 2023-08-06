import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  filter,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filters, setFilters] = useState({
    price: 4000, // Default price range
    discount: [],
    brands: [],
    categories: [],
    rating: 5,
  });

  const applyFilter = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        params: {
          category: filters.categories,
          brands: filters.brands,
          price: filters.price,
          rating: filters.rating,
          discount: filters.discount,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`).then((res) => {
      setProducts(res.data);
    });
  };

  const fetchCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/categories`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.error("Error getting the categories", err);
      });
  };

  const fetchBrand = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/brand`)
      .then((res) => {
        setBrand(res.data);
      })
      .catch((err) => {
        console.error("Error getting the brands", err);
      });
  };

  const sortProducts = (event) => {
    let value = event.target.value;
    let newProducts = [...products];

    if (value === "high") {
      newProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (value === "low") {
      newProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (value === "rating") {
      newProducts.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (value === "desc") {
      newProducts.sort((a, b) => {
        return b.title.localeCompare(a.title); // Use localeCompare for string comparison
      });
    } else {
      newProducts.sort((a, b) => {
        return a.title.localeCompare(b.title); // Use localeCompare for string comparison
      });
    }
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <Box w="90%" m="auto">
      <Box>
        <Breadcrumb separator={<MdArrowForwardIos />}>
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
                    <Box as="span" flex={1} textAlign={"left"}>
                      Category
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Flex flexDirection={"column"}>
                    <CheckboxGroup
                      value={filters.categories}
                      onChange={(newCategories) =>
                        setFilters({ ...filters, categories: newCategories })
                      }
                    >
                      {category.map((item) => (
                        <Checkbox key={item._id} value={item._id}>
                          {item.name}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex={1} textAlign={"left"}>
                      Brand
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Flex flexDirection={"column"}>
                    <CheckboxGroup
                      value={filters.brands}
                      onChange={(newBrands) =>
                        setFilters({ ...filters, brands: newBrands })
                      }
                    >
                      {brand.map((item) => (
                        <Checkbox key={item._id} value={item._id}>
                          {item.name}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex={1} textAlign={"left"}>
                      Price
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Slider
                    value={filters.price}
                    onChange={(newValue) =>
                      setFilters({ ...filters, price: newValue })
                    }
                    min={0}
                    max={5000}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex={1} textAlign={"left"}>
                      Rating
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Slider
                    defaultValue={5}
                    min={0}
                    max={5}
                    value={filters.rating}
                    onChange={(newValue) =>
                      setFilters({ ...filters, rating: newValue })
                    }
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex={1} textAlign={"left"}>
                      Discount
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel>
                  <RadioGroup
                    value={filters.discount}
                    onChange={(newValue) =>
                      setFilters({ ...filters, discount: newValue })
                    }
                  >
                    <Stack>
                      <Box>
                        <Radio value="50">Above 50%</Radio>
                      </Box>
                      <Box>
                        <Radio value="30">Above 30%</Radio>
                      </Box>
                      <Box>
                        <Radio value="20">Above 20%</Radio>
                      </Box>
                      <Box>
                        <Radio value="10">Above 10%</Radio>
                      </Box>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button bg="black" color={"white"} onClick={applyFilter}>
              Apply Filters
            </Button>
          </Stack>
        </Box>
        <Box w="80%">
          <Flex justifyContent={"space-between"}>
            <Text>
              Showing 9 results from total {products && products.length}
            </Text>
            <Flex
              w="30%"
              justifyContent={"space-evenly"}
              alignItems={"center"}
              gap={2}
            >
              <Text w="40%">Sort by</Text>
              <Select onChange={sortProducts}>
                <option value="rating">Popularity</option>
                <option value="high">Price high to low</option>
                <option value="low">Price low to high</option>
                <option value="asc"> A to Z</option>
                <option value="desc"> Z to A</option>
              </Select>
            </Flex>
          </Flex>
          <SimpleGrid columns={3} gap={10} m="50px 0">
            {products &&
              products.map((product, index) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <Box boxShadow={"md"} p={5} borderRadius={"20px"} h="360px">
                    <Image src={product.images[0]} h="250px" w="full" />
                    <Box m="20px 0">
                      <Flex justifyContent={"space-between"}>
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
              ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Products;
