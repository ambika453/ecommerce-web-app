import React, { useEffect, useState } from 'react'
import { Card, Banner, Header, Footer } from '../components';
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  
  const location = useLocation()
  const pathSegments = location.pathname.split('/')
  const uid = pathSegments[2] 

  const setup = async() => {
    setLoading(true)
    try{
      const req1 = await fetch(`http://localhost:8080/users/get/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const req2 = await fetch('http://localhost:8080/products/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const req = [req1, req2]
      const res = await Promise.all(req)

      if (res[0].ok) {
        const res0 = await res[0].json();
        setUser(res0.data);
      }
      if(res[1].ok){
        const res1 = await res[1].json();
        setProducts(res1.data);
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

  const updateUser = async(pid) => {
    const updatedUser = {...user}
    if(user.bookmarks.includes(pid)){
      updatedUser.bookmarks = updatedUser.bookmarks.filter(e => e !== pid)
    }else{
      updatedUser.bookmarks = [...updatedUser.bookmarks, pid]
    }
    console.log(updatedUser.bookmarks)
    try{
      const response = await fetch(`http://localhost:8080/users/${uid}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setUser(updatedUser)
      }
    }catch(err){
      alert(err)
    }
  }

  const handleLikedProducts = (pid) => {
    if(user.bookmarks.includes(pid)){
      return true
    }else{
      return false
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Header user={user} uid={uid}/>
      <Banner />
      <div className='w-11/12 flex flex-row mt-4'>
        <div className='w-full flex'>
          <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
            Store
          </a>
        </div>
        <div className='w-full flex flex-row items-center justify-end'>
          <svg className="fill-current hover:text-black mx-2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
              <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"></path>
          </svg>
          <svg className="flex fill-current hover:text-black mx-2 items-center" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
          </svg>
        </div>
      </div>
      <div className='w-11/12 grid grid-cols-3 gap-4 mt-4 pl-10'>
        { products.map((product, pi)=>(
          <div key={pi}>
            <Card product={product} handleLikedProducts={handleLikedProducts} updateUser={updateUser} uid={uid}/>
          </div>
        ))
        }
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard