import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }else{
            navigate('/login')
        }
    },[navigate])
    const handleLogin = async () =>{
        console.log(email, password)
        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body: JSON.stringify({email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if(result.name){
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        }else{
            alert("please enter correct details")
        }
    }

 return(
    <div className='login'>
        <h1>Login</h1>
        <input type='text' className='inputBox' 
        onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter email' value={email} />         
        <input type='password' className='inputBox' 
        onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter password' value={password}/>   
        <button type="button" onClick={handleLogin} className="registerButton">Login</button>     
    </div>
 )   
}

export default Login