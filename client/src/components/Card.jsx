import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Card = ({product, handleLikedProducts, updateUser, uid}) => {
  const [imgno, setImgno] = useState(0)
  const [liked, setLiked] = useState(handleLikedProducts(product._id))

  const handleLike = () => {
    setLiked(!liked)
    updateUser(product._id)
  }

  return (
    <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
        <div class="relative flex flex-col h-80 overflow-hidden">
            <div className='w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M15 18l-6-6 6-6"></path></svg>
            </div>
            <Link to={`http://localhost:5173/user/${uid}/product/${product._id}`}>
              <div>
                {imgno==0 ?
                  <img class="absolute top-0 right-0 h-full w-full object-cover" src={product.photoUrl[0]} alt="product image" />
                  : imgno==1 ?
                  <img class="absolute top-0 right-0 h-full w-full object-cover" src={product.photoUrl[1]} alt="product image" />
                  : imgno==2 ?
                  <img class="absolute top-0 right-0 h-full w-full object-cover" src={product.photoUrl[2]} alt="product image" />
                  :
                  <img class="absolute top-0 right-0 h-full w-full object-cover" src={product.photoUrl[3]} alt="product image" />
                }
              </div>
            </Link>
            <div className='w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6"></path></svg>
            </div>
            <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0"></div>
          </div>
        <div class="pt-6 px-5 pb-3 h-40 overflow-hidden">
          <a href="#">
            <h5 class="text-xl tracking-tight text-slate-900">{product.name}</h5>
          </a>
          <div class="my-4 flex flex-row items-center justify-center">
            <p className='w-full items-start'>
              <span class="text-2xl font-bold text-slate-900">Rs. {product.price}</span>
            </p>
            <button class="pr-4 w-full flex h-10 w-10 items-center justify-end">
              <svg class="h-7 w-7 text-black hover:text-gray-600" onClick={handleLike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" fill={liked?"black":"none"} stroke="black" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
  )
}

export default Card