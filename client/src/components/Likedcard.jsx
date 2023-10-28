import React from 'react'
import { Link } from 'react-router-dom'

const Likedcard = ({uid, product, addToCart, wishlist}) => {

  const handleWishlist = () => {
    if(product){
      wishlist(product._id)
    }
  }

  const handleAddtocart = () => {
    if(product){
      addToCart(product._id)
    }
  }

  return (
    <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
           <Link to={`http://localhost:5173/user/${uid}/product/${product._id}`}>
            <a class="relative flex h-80 overflow-hidden" href="#">
              <img class="absolute top-0 right-0 h-full w-full object-cover" src={product && product.photoUrl && product.photoUrl[0]} alt="product image" />
              <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
              </div>
            </a>
          </Link>
          <span className='absolute group invisible ml-72 font-b text-xl mt-2 cursor-pointer group-hover:visible' onClick={handleWishlist}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" fill="#343a40" viewBox="0 0 50 50">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </span>
        <div class="flex flex-col justify-center items-start pt-6 px-5 pb-3 h-40 overflow-hidden">
          <a href="#">
            <h5 class="text-xl tracking-tight text-slate-900">{product && product.name}</h5>
          </a>
          <div class="w-full my-4 flex flex-row items-center justify-center">
            <p className='w-full items-start'>
              <span class="text-2xl font-bold text-slate-900">Rs. {product &&product.price}</span>
            </p>
            <div className='w-full  flex py-1 items-center justify-end'>
                <button type="button" class="flex flex-row items-center justify-center p-1 border-2 border-transparent bg-gray-900 bg-none text-center text-base text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    <svg className="fill-current mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"></path>
                        <circle cx="10.5" cy="18.5" r="1.5"></circle>
                        <circle cx="17.5" cy="18.5" r="1.5"></circle>
                    </svg>
                    <span className='mr-2 cursor-pointer' onClick={handleAddtocart}>Add to cart</span>
                </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Likedcard