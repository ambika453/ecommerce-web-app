import React, { useState, useEffect } from 'react'
import { Header, Footer, Likedcard } from '../components'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Bookmarks = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  
  const navigate = useNavigate()
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
        var dummy_products = []
        const userBody = await userResponse.json();
        const userData = userBody.data
        setUser(userData)
        const productIds = userData.bookmarks
    
        for (const productId of productIds) {
          try{
            const productResponse = await fetch(`http://localhost:8080/products/get/${productId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (productResponse.ok) {
              const productBody = await productResponse.json();
              const productData = productBody.data
              dummy_products = [...dummy_products, productData]
            }
          }catch(err){
            alert(err)
          }
        }
        setProducts(dummy_products)
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

  const addToCart = (pid) => {
    if(user.carts.product_id==pid){
      alert("product is already in the cart")
    }else{
      let newCart = {}
      for(let i=0; i<products.length; i++){
        if(products[i]._id==pid){
          newCart = {pid:pid, name:products[i].name, image:products[i].photoUrl[0], size:products[i].sizes[0], color:products[i].colors[0], price:products[i].price, qty: 1}
          break;
        }
      }
      let updatedUser = {...user}
      updatedUser.carts = [...updatedUser.carts, newCart]
      setUser(updatedUser)
      userUpdate(updatedUser)
      alert("Added to cart")
    }
  }

  const wishlist = async(pid) => {
    let updatedProducts = [...products]
    let updatedUser = {...user}
    updatedProducts = updatedProducts.filter(p => p._id !== pid)
    updatedUser.bookmarks = updatedUser.bookmarks.filter(e => e !== pid)
    setProducts(updatedProducts)
    setUser(updatedUser)
    userUpdate(updatedUser)
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <Header user={user} uid={uid}/>
        <div className='w-11/12 mt-2 flex flex-col justify-center items-center'> 
          <Link to={`/user/${uid}/dashboard`} className='w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" className='flex w-6 h-6 cursor-pointer justify-start' viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
          </Link>
          <p class="flex mt-8 w-11/12 justify-start pl-8 text-xl font-bold">My Wishlist</p>
            {
            products.length>0 ? (
                <div className='w-11/12 grid grid-cols-3 gap-6 mt-4 pl-8'>
                  {products.map((product)=>(
                    <div key={product._id}>
                      <Likedcard uid={uid} product={product} wishlist={wishlist} addToCart={addToCart}/>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='py-36 text-l'>Your wishlist has no items</div>
              )
            }
        </div>
        <Footer/>
    </div>
  )
}

export default Bookmarks