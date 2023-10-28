import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Header, Footer } from '../components'

const PaymentFailure = () => {

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
    <div className='w-full flex flex-col items-center'>
      <Header uid={uid} user={user} />
      <div className='w-11/12 pt-8'>
        <Link to={`/user/${uid}/cart`}>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
        </Link> 
      <div className='w-full flex flex-col justify-center items-center py-36'>
        
          <div class="w-3/5 bg-red-100 rounded-md p-3 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8' version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="M14.637 27.065a12.457 12.457 0 0 1-8.838-3.655c-4.874-4.874-4.874-12.804 0-17.678a12.419 12.419 0 0 1 8.839-3.662c3.339 0 6.478 1.3 8.838 3.662 2.361 2.361 3.662 5.5 3.662 8.839s-1.3 6.478-3.662 8.839a12.46 12.46 0 0 1-8.839 3.655zm.001-22.995a10.428 10.428 0 0 0-7.425 3.076c-1.983 1.983-3.075 4.62-3.075 7.425s1.092 5.441 3.075 7.425c4.094 4.094 10.756 4.095 14.849 0 1.983-1.983 3.076-4.62 3.076-7.425s-1.092-5.441-3.076-7.425a10.432 10.432 0 0 0-7.424-3.076z" fill="#b91c1c" class="color000000 svgShape"></path><path d="M10.395 19.813a.999.999 0 0 1-.707-1.707l8.485-8.485a.999.999 0 1 1 1.414 1.414l-8.485 8.485a.993.993 0 0 1-.707.293z" fill="#b91c1c" class="color000000 svgShape"></path><path d="M18.88 19.813a.997.997 0 0 1-.707-.293l-8.485-8.485a.999.999 0 1 1 1.414-1.414l8.485 8.485a.999.999 0 0 1-.707 1.707z" fill="#b91c1c" class="color000000 svgShape"></path></svg>
          <div class="text-red-700 pl-8">
              <div class="font-bold text-xl">Order Cancelled!</div>

              <div>Your order is cancelled. If you wish to continue the payment please go to cart and place order</div>
          </div>
          </div>
          <Link to={`/user/${uid}/dashboard`} class="group mt-28 flex w-60 cursor-pointer select-none items-center justify-center bg-black py-2 text-white transition">
                <span class="group flex w-2/3 items-center justify-center py-1 text-center font-medium">Continue Shopping</span>
                <svg class="flex-0 mt-1 group-hover:w-7 ml-2 h-5 items-center w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" stroke="currentColor" stroke-width="2">
                  <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/>
                </svg>
          </Link>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PaymentFailure