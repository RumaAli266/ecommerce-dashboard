import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductList = () =>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    }, [])

    const getProducts = async() =>{
        axios.get('http://localhost:5000/products').then(
            res =>{
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteProduct = async(id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: "DELETE",
        });
        result = await result.json();
        console.log('what in result', result)
        if(result){
            getProducts();
        }
    }

    return(
    <div className='product-list'>
    <h1 class="display-1" style={{margin:"20px"}}>Products Listing</h1>
    
    </div>
)}

export default ProductList

// 160608888
