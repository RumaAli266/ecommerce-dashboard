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
        <div class="row row-cols-3 g-4">
        {products.map((data, key)=>{
            return(
                <div class="col" key={key}>
                    <div class="card" style={{margin:"20px", minHeight:"370px"}}>
                    <div class="card-body">
                        <img alt='issue' src={`http://localhost:5000/${data?.photo}`} width='200px' height='200px' style={{borderRadius: "50%" }}/>
                        <h5 class="card-title">{data.name}</h5>
                        <h4 class="card-title">${data.price}</h4>
                        <h3 class="card-title">{data.category}</h3>
                        {/* {console.log(`http://localhost:5000/${data?.photo}`)} */}
                        <p class="card-text">{data.company}</p>
                        <button type="button" class="btn btn-danger" onClick={()=>deleteProduct(data._id)}>Delete</button>
                    </div>
                    </div>
                </div>
        )})}
        </div>
    </div>
)}

export default ProductList

// 160608888
