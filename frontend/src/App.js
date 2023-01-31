import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
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
