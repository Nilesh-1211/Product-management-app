import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList =()=>{
    const [products,setProducts]=useState([]);
    const [isAdmin,setAdmin]=useState(true);
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setProducts(result);
    }
    
    const deleteProduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/products/${id}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json;
        if(result)
        {
            getProducts();
            alert("Record is deleted.");
        }
    }

    const searchHandle=async(event)=>{
        let key= event.target.value;
        if(key)
        {
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result=await result.json();
            if(result)
            {
                setProducts(result);
            }
        }
        else
        {
            getProducts();
        }

    }

    return(
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search-box" type="text" placeholder="Search Products"
            onChange={searchHandle}
            />
            <ul>
                <li>Sl. no.</li>
                <li>Name</li>
                <li>Brand</li>
                <li>Price</li>
                <li>Category</li>
                <li>Quantity</li>
                {
                    isAdmin&&
                    (<li>Operation</li>)
                }
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.brand}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.quantity}</li>
                {
                    isAdmin &&
                    (<li>
                    <button className="delete-button" onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link className="update-link" to={"/update/"+item._id}>Update</Link>
                </li>)}
            </ul>
            )
            :<h4>No product found.</h4>
        }
        </div>
    )
}

export default ProductList;