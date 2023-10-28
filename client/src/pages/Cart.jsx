import React, { useState, useEffect} from 'react';
import { Header, Footer, Checkoutcard, PaymentForm } from '../components'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [total, setTotal] = useState(0)

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
      })
  
      if (userResponse.ok) {
        let dummy_Carts = []
        const userBody = await userResponse.json()
        const userData = userBody.data
        setUser(userData)
      }else{
        alert('Fetched user but something wrong in frontend')
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    setup()
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
        console.log("user updated")
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  const handleQuantity = (pid, name) => {
    let updatedUser = {...user}
    for(let i=0; i<updatedUser.carts.length; i++){
      if(updatedUser.carts[i].pid==pid){
        if(name=='plus'){
          updatedUser.carts[i].qty+=1
          break;
        }else if(name=='minus'){
          if(updatedUser.carts[i].qty<2){
            updatedUser.carts = updatedUser.carts.filter(e=> e.pid!== pid)
            break;
          }else{
            updatedUser.carts[i].qty-=1
          }
        }
      }
    }
    const updatedTotal = 0
    for(let j=0; j<updatedUser.length; j++){
      updatedTotal+= updatedUser.carts[j].price
    }
    setTotal(updatedTotal)
    setUser(updatedUser)
    userUpdate(updatedUser)
  }

  const handlePlaceOrder = async() => {
    setLoading(true)
    const data = {
      uid: uid,
      carts: user.carts
    }
    const stripe = await loadStripe("pk_test_51NpkqbSFy4cJfUpd4BbW4I7v7CbUbFKeTN1OOsSYXSyzvw3sv3WBrVii6jHfQhuuv05Pe3Pfh9LBZ8V5tWdEDL5r00ZqKibyLD")
    try{
      const response = await fetch('http://localhost:8080/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const session = await response.json();
        const result = stripe.redirectToCheckout({
          sessionId: session.id
        })
        const updatedUser = {...user}
        updatedUser.carts = []
        setUser(updatedUser)
        userUpdate(updatedUser)
      }
    }catch(err){
      alert(err)
    }finally{
      setLoading(false)
    }
  }

  console.log(user)

  return (
    <div className='w-full flex flex-col items-center'>
      <Header user={user} uid={uid}/>
        <div className='w-11/12 pt-8'>
        <Link to={`/user/${uid}/dashboard`}>
        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"/></svg>
        </Link> 
        <div class="w-full flex flex-row items-center justify-center py-4">
          <div className='w-full flex flex-col items-center'>
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className='flex flex-col w-full pt-12 items-center justify-center'>
                <div class="flex w-1/2 flex-col justify-center space-y-3 border bg-white px-2 py-4 sm:px-6">
                  {user?.carts?.map((cart, ci)=>(
                      <div key={ci}>
                        <Checkoutcard cart={cart} handleQuantity={handleQuantity}/>
                      </div>
                    ))
                  }
                </div>
                <div className='flex items-center justify-center w-1/2 py-2 mt-8 bg-black font-medium text-white'>
                  <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart