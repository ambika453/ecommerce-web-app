import React from 'react'
import { Link } from 'react-router-dom'

const Checkoutcard = ({ cart, handleQuantity}) => {

  const handleQuantityChange = (e) => {
    handleQuantity(cart.pid, e.target.name)
  }

  console.log(cart)

  return (
        <div class="w-full flex flex-col bg-white sm:flex-row">
          <Link to={`/user/6533db13138fa54e75612bcf/product/${cart.pid}`}>
            <img class="flex items-center justify-center my-2 mr-6 h-36 w-36 border object-cover object-center" src={cart.image} alt="" />
          </Link>
          <div class="flex w-full flex-col justify-center px-4 py-2">
            <span class="font-semibold">{cart.name}</span>
            <h2 className='text-gray-400 my-1 text-xl'>{cart.size}</h2>
            <img src={cart.color} className='w-6 h-6'/>
            <div className='w-full flex flex-row justify-center mt-6 items-center'>
              <div className='w-full flex justify-start'>
                <div className='flex flex-row border border-gray-300 px-2 items-center justify-center'>
                  <span className='pl-1 cursor-pointer text-2xl'><button name='minus' onClick={handleQuantityChange}>&minus;</button></span>
                    <input type='text' className=' w-12 outline-none text-l text-center' value={cart.qty}/>
                  <span className='pr-1 cursor-pointer text-2xl'><button name='plus' onClick={handleQuantityChange}>&#43;</button></span>
                </div>
              </div>
              <p class="w-full flex justify-end text-lg font-bold">Rs. {cart.price*cart.qty}</p>
              </div>
            </div>
        </div>
  )
}

export default Checkoutcard