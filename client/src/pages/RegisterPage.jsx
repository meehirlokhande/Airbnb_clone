// import React from 'react';
import {useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
const RegisterPage = () =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function  registerUser(ev) {
        ev.preventDefault();
        try{
        const response = await axios.post('/register', {
            name,
            email,
            password,
        });
        alert('User registration successful',response.data);
        } catch(error){
        alert('User registration failed',error);
        }
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Sign Up</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>

                <input type="text" 
                    placeholder="username" 
                    value={name} 
                    onChange={ev=>setName(ev.target.value)} />
                <input type="email" 
                    placeholder="your@gmail.com"
                    value={email}
                    onChange={ev =>setEmail(ev.target.value)} />
                <input type="password" 
                    placeholder="password"
                    value={password}
                    onChange={ev=>setPassword(ev.target.value)} />

                <button className="login text-white">Register</button>
                <div className="text-center py-2 text-gray-500 ">Already a member ? 
                <Link to={'/login'} className="underline text-black">Login</Link>
                </div>
            </form>
            </div>
        </div>
    );
};

export default RegisterPage;