import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct=()=>{
    const [name,setName]=React.useState('');
    const [brand,setBrand]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [quantity,setQuantity]=React.useState('');
    const [error,setError]=React.useState(false);
    const navigate=useNavigate();
    const addProduct = async()=>{
        if(!name||!brand||!price||!category||!quantity)
        {
            setError(true);
            return false;
        }
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,brand,price,category,quantity,userId}),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result=await result.json();
        
    }

    return (
        <div className='product'>
            <h1 className='header'>Add Product</h1>
            <input className='inputBox' type='text' placeholder='Enter Product Name'
            value={name} onChange={(e)=>{setName(e.target.value)}}
            />
            {error && !name &&<span className='invalid-input'>This field is required.</span>}
            <input className='inputBox' type='text' placeholder='Enter Product Brand'
            value={brand} onChange={(e)=>{setBrand(e.target.value)}}
            />
            {error && !brand &&<span className='invalid-input'>This field is required</span>}
            <input className='inputBox' type='text' placeholder='Enter Product Price(INR)'
            value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            {error && !price &&<span className='invalid-input'>This field is required.</span>}
            <input className='inputBox' type='text' placeholder='Enter Product Category'
            value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
            {error && !category &&<span className='invalid-input'>This field is required</span>}
            <input className='inputBox' type='text' placeholder='Enter Product Quantity'
            value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}
            />
            {error && !quantity &&<span className='invalid-input'>This field is required</span>}
            <button onClick={addProduct} className='button'>Add Product</button>
        </div>
    )
}

export default AddProduct;