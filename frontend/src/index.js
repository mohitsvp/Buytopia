import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react"

import "./index.css"
import AuthProvider from './Context/Auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ChakraProvider>
);


