import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const handleLogin= async()=>{
        let result=await fetch('http://localhost:5000/login',{
            method: "post",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("Please enter the correct details.")
        }
    }

    return(
        <div className="login">
            <h1 className="header">Login</h1>
            <input type="text" className="inputBox" placeholder="Enter email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin} className="button" type="button">Login!</button>
        </div>
    )
}

export default Login;