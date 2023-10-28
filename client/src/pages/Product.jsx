import React, { useState, useEffect } from 'react'
import { Header, Footer } from '../components'
import { useNavigate, Link, useLocation } from 'react-router-dom'

const Product = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [product, setProduct] = useState({})
  const [liked, setLiked] = useState()
  const [cart, setCart] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 
  const pid = pathSegments[4]

  const setup = async() => {
    setLoading(true)
    try{
      const req1 = await fetch(`http://localhost:8080/products/get/${pid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const req2 = await fetch(`http://localhost:8080/users/get/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const req = [req1, req2]
      const res = await Promise.all(req)

      if(res[0].ok && res[1].ok){
        const res0 = await res[0].json();
        const res1 = await res[1].json();
        setProduct(res0.data);
        setUser(res1.data);
        if(res1.data.bookmarks.includes(res0.data._id)){
          setLiked(true)
        }else{
          setLiked(false)
        }
        setCart({pid:res0.data._id, name:res0.data.name, image:res0.data.photoUrl[0], color:res0.data.colors[0], size:res0.data.sizes[0], price:res0.data.price, qty:1})
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    setup();
  },[])

  const userUpdate = async(data) => {
    setLoading(true)
    try{
      const response = await fetch(`http://localhost:8080/users/${uid}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("ok")
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  } 

  const handleLike = () => {
    const updatedUser = {...user}
    if(user.bookmarks.includes(product._id)){
      updatedUser.bookmarks = updatedUser.bookmarks.filter(e => e !== product._id)
    }else{
      updatedUser.bookmarks = [...updatedUser.bookmarks, product._id]
    }
    setLiked(!liked)
    setUser(updatedUser)
    userUpdate(updatedUser)
  }

  const handleCartUpdate = (e) => {
    setCart({...cart, [e.target.name]: e.target.value})
  }

  const handleAddtocart = () => {
    const updatedUser = {...user}
    updatedUser.carts = [...updatedUser.carts, cart]
    setUser(updatedUser)
    userUpdate(updatedUser)
    alert("Added to Cart")
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <Header user={user} uid={uid}/>
      <section class="mb-4 w-11/12">
          <Link to={`/user/${uid}/dashboard`}>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
          </Link> 
          <div class="pt-4">
            <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div class="lg:col-span-3 lg:row-end-1">
                <div class="lg:flex lg:items-start">
                  <div class="lg:order-2 lg:ml-5">
                    <div class="max-w-xl overflow-hidden">
                      <img class="h-full w-full max-w-full object-cover" src={product && product.photoUrl && product.photoUrl[0]} alt="" />
                    </div>
                  </div>
                </div>
              </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
              <div className='flex flex-row py-4 items-center'>
                <div class="flex items-end">
                    <h1 class="text-3xl font-bold">Rs. {product.price}</h1>
                </div>
              </div>
              <p>Inclusive of all taxes</p>

              <h2 class="mt-8 text-base text-gray-900">Color</h2>
              <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                {product && product.colors && product.colors.map((color)=>(
                  <label key={color}>
                    <input type="radio" name="color" value={color} onClick={handleCartUpdate} class="peer sr-only"/>
                    <img class='peer-checked:border border-black mx-1 w-10 h-10 p-1' src={color}/>
                  </label>
                ))}
              </div>

              <h2 class="mt-8 mb-2 text-base text-gray-900">Size</h2>
                <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                  { ['S','M','L','XL','XXL'].map((size)=>(
                    <label key={size}>
                      <input type="radio" name="size" value={size} onClick={handleCartUpdate} class="peer sr-only" disabled={product && product.sizes && !product.sizes.includes(size)}/>
                      <p class={`peer-checked:border border-black px-3 py-1 mx-1 ${product && product.sizes && product.sizes.includes(size) ? 'text-black' : 'text-gray-300'}`}>{size}</p>
                    </label>
                  ))}
                </div>

              <div class="mt-10 flex flex-row items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className='w-full'>
                  <button type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={handleAddtocart}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <div className='w-full'>
                  <button className='inline-flex items-center justify-center border border-black p-2 rounded-md bg-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" onClick={handleLike} viewBox="0 0 20 20" stroke="white" fill={liked?"white":"currentColor"}>
                      <path fillRule="nonzero" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipule="nonzero" />
                    </svg>
                  </button>
                </div>
              </div>

              <ul class="mt-8 space-y-2">
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                  </svg>
                  Free shipping worldwide
                </li>

                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>

            <div class="lg:col-span-3 pl-4">
                <div className='border-b border-gray-300 pb-2'>Description</div>

                <div class="mt-4 flow-root sm:mt-6 whitespace-pre-line">
                  <div>{product.description}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <Footer />
    </div>
  )
}

export default Product