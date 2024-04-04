'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'
import Link from 'next/link';


const signup = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user);
            console.log("sign up success", response.data)
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>{loading ? "Processing" : "Signup"}</h1>
          <label htmlFor='username'>Username</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 
              focus: outline-none 
              focus: border-gray-400"
              id="username"
              value={user.username}
              onChange={(e) => { setUser({...user, username: e.target.value})}}
              type="text"
          />
          <label htmlFor='email'>email</label>
          <input
              id="email"
              className="p-2 borderborder-gray-300 
              rounded-lg mb-4 
              focus: outline-none 
              focus:border-gray-400"
              value={user.email}
              onChange={(e) => { setUser({...user, email: e.target.value})}}
              type="text"
          />
          <label htmlFor='email'>Password</label>
          <input
              id="password"
              className="p-2 border border-gray-300 
              rounded-lg mb-4 
              focus: outline-none 
            focus:border-gray-400"
              value={user.password}
              onChange={(e) => { setUser({...user, password: e.target.value})}}
              type="text"
          />
            <button 
              className=" p-2 borderborder-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-400"
              onClick={onSignUp}>{buttonDisabled ? "No Sign Up" : "Signup"}
            </button>
            <Link href="/login">Go to Login Page</Link>
          
    </div>
  )
}
 
export default signup
