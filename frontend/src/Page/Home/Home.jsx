import React from 'react'
import { styled } from 'styled-components'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Brands from './Brands/Brands'


const Wrapper = styled.header`
  background-color : ${({theme}) => theme.colors.bg}

`

const Home = () => {
  return (
    <Wrapper>
        <HeroSection/>
        <Brands/>
    </Wrapper>
  )
}

export default Home