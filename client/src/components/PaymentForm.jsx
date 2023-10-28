import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({uid, user, order, handleShippingAddress}) => {

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const CARD_OPTIONS = {}

    const handleInput = (e) => {
      handleShippingAddress(e)
    }

    const handlePlaceOrder = async() => {
        // let updatedUser = {...user}
        // updatedUser.carts = []
        // setUser(updatedUser)
        // userUpdate(updatedUser)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)
        })
        if(!error){
          try{
            const {id} = paymentMethod
            const response = await fetch('http://localhost:8080/stripe/create-payment-intent',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: order.amount,
                id: id,
                uid: uid
              })
            });
    
            if(response.ok){
                const responseBody = await response.json();
                const responseData = responseBody.data 
                console.log(responseData)
            }else{
              navigate(`/user/${uid}/payment-failed`)
            }
          }catch(err){
            alert(err)
          }
        }
      }

    return (
    <div>
      <p class="text-xl font-medium">Shipping Address</p>
        <p class="text-gray-400">Complete your order by providing your payment details.</p>
        <div class="mt-4">
          <div className='flex flex-row'>
            <div className='flex flex-col w-full mr-2'>
              <label for="email" class="mt-4 mb-2 block">First Name</label>
              <input type="text" name="fname" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.fname} onChange={handleInput}/>
            </div>
            <div className='w-full flex flex-col ml-2'>
            <label for="email" class="mt-4 mb-2 block">Last Name</label>
            <input type="text" name="lname" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.lname} onChange={handleInput}/>
            </div>
          </div>
          <div class="relative">
            <label for="card-holder" class="mt-4 mb-2 block">Street Address 1</label>
            <input type="text" name="area1" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.area1} onChange={handleInput}/>
          </div>
          <div class="relative">
            <label for="card-holder" class="mt-4 mb-2 block">Card Details</label>
            <CardElement options={CARD_OPTIONS}/>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col w-1/2 mr-2'>
              <label for="email" class="mt-4 mb-2 block">Country</label>
              <input type="text" name="country" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.country} onChange={handleInput}/>
            </div>
            <div className='w-3/8 flex flex-col ml-2'>
            <label for="email" class="mt-4 mb-2 block">City</label>
            <input type="text" name="city" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.city} onChange={handleInput}/>
            </div>
            <div className='w-1/8 flex flex-col ml-2'>
            <label for="email" class="mt-4 mb-2 block">Zip Code</label>
            <input type="text" name="pincode" class="w-full border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={user.pincode} onChange={handleInput}/>
            </div>
          </div>

          <div class="mt-6 border-t border-b py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Subtotal</p>
              <p class="font-semibold text-gray-900">Rs. {order.amount}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Shipping</p>
              <p class="font-semibold text-gray-900">Rs. 150</p>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total</p>
            <p class="text-2xl font-semibold text-gray-900">Rs. {order.amount+150}</p>
          </div>
        </div>
        <button class="mt-4 mb-8 w-full bg-gray-900 px-6 py-3 font-medium text-white" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    )
}

export default PaymentForm