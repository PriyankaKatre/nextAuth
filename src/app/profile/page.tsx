'use client'

import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function profilePage() {
    const router = useRouter();
    const [data, setData] = useState('nothing');
    const getUserDetails = async() => { 
        try {
            const res= await axios.post('/api/users/me');
        console.log(res.data.data._id)
        setData(res.data.data._id)
        }
        catch(error: any) {
        console.log(error.message)
        }
    } 
    const logout = async() => { 
        try {
            const res= await axios.get('/api/users/logout');   
            toast.success("logout success") 
            router.push('/login')
        
        }
        catch(error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <hr />
      <h2>{data === 'nothing' ? "nothing" : 
        <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button
            className=" p-2 border bg-blue-200  border-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-400"
            onClick={logout}>logout
          </button>
           <button
            className=" p-2 border bg-green-200 border-gray-300 rounded-lg mb-4 focus: outline-none focus: border-gray-400"
            onClick={getUserDetails}>Get User Details
        </button>
    </div>
  )
}

export default profilePage