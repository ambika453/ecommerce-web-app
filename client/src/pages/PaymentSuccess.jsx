import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Header, Footer } from '../components'

const PaymentSuccess = () => {

  const [user, setUser] = useState({})

  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 

  const setup = async() => {
    setLoading(true)
    try {
      const userResponse = await fetch(`http://localhost:8080/users/get/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (userResponse.ok) {
        const userBody = await userResponse.json();
        const userData = userBody.data
        setUser(userData)
      }
    } catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    setup();
  },[])

    return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Header uid={uid} user={user} />
      <div className='w-11/12 pt-8'>
        <Link to={`/user/${uid}/cart`}>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
        </Link> 
      <div className='w-full flex flex-col justify-center items-center py-36'>
          <div class="w-3/5 bg-green-100 rounded-md p-3 flex justify-center items-center">
              <svg
                  class="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
              </svg>

          <div class="text-green-700 pl-8">
              <div class="font-bold text-xl">Order Placed!</div>

              <div>Your order will be delivered in 2-3 working days. Information about order summary sent to your email.</div>
              <div className='text-l font-bold'>Thank you for shopping with us!</div>
          </div>
          </div>
          <Link to={`/user/${uid}/dashboard`} class="group mt-32 flex w-60 cursor-pointer select-none items-center justify-center bg-black py-2 text-white transition">
                <span class="group flex w-2/3 items-center justify-center py-1 text-center font-medium">Continue Shopping</span>
                <svg class="flex-0 mt-2 group-hover:w-7 ml-2 h-5 items-center w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" stroke="currentColor" stroke-width="2">
                  <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/>
                </svg>
          </Link>
      </div>
      <Footer/>
      </div>
    </div>
  )
}

export default PaymentSuccess