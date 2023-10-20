import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import jwtDecode from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const api = axios.create({
    baseURL: 'YOUR_API_BASE_URL', // Replace with your API base URL
  });

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/refresh-token', { refreshToken }); // Replace with your backend API endpoint
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken); // Store new token in localStorage
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle error, e.g., redirect to login page
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    } else {
      refreshAccessToken();
    }
  }, []);

  api.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        // Check if access token is expired
        const tokenExpiration = jwtDecode(accessToken).exp;

        if (tokenExpiration <= Date.now() / 1000) {
          await refreshAccessToken();
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


  return (
    <div>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList />}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/update' element={<h1>Update Product component</h1>}/>
        <Route path='/logout' element={<h1>Logout component</h1>}/>
        <Route path='/profile' element={<h1>Profile component</h1>}/>
        </Route>

        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
