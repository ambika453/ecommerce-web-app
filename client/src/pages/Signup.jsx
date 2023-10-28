import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
            fname: '',
            lname: '',
            email: '',
            number: 0,
            area1: '',
            area2: '',
            county: '',
            city: '',
            state: '',
            pincode: 0,
            password: '',
            bookmarks: [],
            carts: []
    })
    const navigate = useNavigate()

    const handleInput = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSignup = async() => {
        setLoading(true)
        try{
        const userResponse = await fetch('http://localhost:8080/users/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (userResponse.ok) {
            const userBody = await userResponse.json()
            const userData = userBody.data
            navigate(`/user/${userData._id}/dashboard`)
        }
        }catch(err){
            alert(err)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='w-full flex justify-center'>
        <div class="md:h-screen w-1/3 relative flex flex-col justify-center items-center">
        <div class="md:border md:border-gray-300 w-full bg-white md:shadow-lg shadow-none rounded p-10" >
            <div class="flex flex-col items-center justify-center space-y-6">
                <div className='w-full flex justify-center'>
                <a class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-2xl " href="#">
                <svg class="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"></path>
                </svg>
                UNIQLO
                </a>
                </div>
            <p className='font-medium text-xl py-2'>Sign Up</p>
            </div>
            <div class="w-full mt-4">
                <div className='relative mb-4 flex flex-row'>
                    <div className='relative mr-2'>
                        <label className='relative mb-1'>First Name</label>
                        <input name='fname' value={user.fname} onChange={handleInput} class="w-full rounded px-3 border border-gray-300 py-3 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="text" autofocus/>
                    </div>
                    <div className='relative ml-2'>
                        <label className='relative mb-1'>Last Name</label>
                        <input name='lname' value={user.lname} onChange={handleInput} class="w-full rounded px-3 border border-gray-300 py-3 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="text" autofocus/>
                    </div>
                </div>
                <div class="relative mb-4">
                    <label className='relative mb-1'>Email</label>
                    <input name='email' value={user.email} onChange={handleInput} class="w-full rounded px-3 border border-gray-300 py-3 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="email" autofocus/>
                </div>
                <div class="relative mb-8">
                    <label className='relative mb-1'>Password</label>
                    <input name='password'value={user.password} onChange={handleInput} class="w-full rounded px-3 border border-gray-300 py-3 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none input active:outline-none" type="password" autofocus/>
                </div>
                <div class="relative mb-8">
                    <div class="flex justify-center items-center">
                        <button className='py-3 relative w-full bg-black text-white rounded text-l font-bold' onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                <div className='relative w-full flex flex-row items-center justify-center'>
                    <p className='flex w-full items-start'>Registered Already?</p>
                    <Link to={'/'} className='w-full flex items-end font-medium cursor-pointer hover:underline'>Sign In</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Signup