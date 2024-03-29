import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Products from "./Page/Products/Products";
import Contact from "./Page/Contact/Contact";
import SingleProduct from "./Page/SingleProduct/SingleProduct";
import Cart from "./Page/Cart/Cart";
import Error from "./Page/Error/Error";
import { GlobalStyle } from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/Register";
import Checkout from "./Page/Checkout/Checkout";
import Payment from "./Page/Payment/Payment";

function App() {

  const theme = {
    colors : {
      bg : "#fff"
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle/>
          <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/product/:id" element={<SingleProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
