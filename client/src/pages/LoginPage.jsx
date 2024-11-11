// import React from "react";
import { useContext, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../UserContext";

const LoginPage = () =>{
    //States
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext)
    //functions
      const handleUserlogin = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/login',{
                email,
                password
            });
            setUser(data);
            alert('Login Successful',data);
            setRedirect(true);
        }catch(error){
            alert('Unable to login', error);
        }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleUserlogin}>
                <input 
                    type="email"
                    placeholder="your@gmail.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="login text-white my-3">Login</button>
                <div className="text-center py-2 text-gray-500 ">Dont have an account yet? 
                <Link to={'/register'} className="underline text-black">Register</Link>
                </div>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;