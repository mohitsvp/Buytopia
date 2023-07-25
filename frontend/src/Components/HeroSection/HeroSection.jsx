import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import hero_section_1 from "../../Assets/hero-section-1.avif"
import hero_section_2 from "../../Assets/hero-section-2.avif"

import Slider from "react-slick"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};



const HeroSection = () => {
  return (
    <Box w="90%" m="20px auto" position={'relative'}>
        <Box>
            <Slider {...settings}>
                <Box>
                    <Image src={hero_section_1} h="600px" w="95%" borderRadius="20px"/>
                </Box>
                <Box>
                    <Image src={hero_section_2} h="600px"  w="95%"  borderRadius="20px"/>
                </Box>
            </Slider>       
            {/* <Box position={'absolute'} top="40%" left="10%" color="white">
                <Box><Heading size={'4xl'} w="80%" textAlign={'center'}>Level up your styles with our summer collections</Heading></Box>
            </Box> */}
        </Box>
    </Box>
  )
}

export default HeroSection