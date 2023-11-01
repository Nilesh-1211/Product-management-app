import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct=()=>{
    const [name,setName]=React.useState('');
    const [brand,setBrand]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [quantity,setQuantity]=React.useState('');
    const params=useParams();
    const navigate=useNavigate();
    

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails=async()=>{
        let result=await fetch(`http://localhost:5000/products/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setName(result.name);
        setBrand(result.brand);
        setPrice(result.price);
        setCategory(result.category);
        setQuantity(result.quantity);
    }

    const updateProduct = async()=>{
        let result=await fetch(`http://localhost:5000/products/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,brand,price,category,quantity}),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json;
        navigate('/');
    }

    return (
        <div className='product'>
            <h1 className='header'>Update Product</h1>
            <input className='inputBox' type='text' placeholder='Enter Product Name'
            value={name} onChange={(e)=>{setName(e.target.value)}}
            />
            
            <input className='inputBox' type='text' placeholder='Enter Product Brand'
            value={brand} onChange={(e)=>{setBrand(e.target.value)}}
            />
            
            <input className='inputBox' type='text' placeholder='Enter Product Price(INR)'
            value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            
            <input className='inputBox' type='text' placeholder='Enter Product Category'
            value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
            
            <input className='inputBox' type='text' placeholder='Enter Product Quantity'
            value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}
            />
            
            <button onClick={updateProduct} className='button'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;