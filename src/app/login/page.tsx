'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'
import Link from 'next/link';

const loginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user);
            console.log("login up success", response.data)
            router.push('/profile')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
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
            onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}
        </button>
        <Link href="/signup">Go to signup Page</Link>
    </div>
  )
}

export default loginPage
