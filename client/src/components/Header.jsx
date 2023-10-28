import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({user, uid}) => {

  const [clicked, setClicked] = useState(false)

  const handleOnclicked = () => {
    setClicked(!clicked)
  }

  return (
    <header className='w-11/12 flex flex-row items-center pb-4'>
        <div className='w-full flex '></div>
        <div className='w-full flex justify-center'>
          <a class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-2xl " href="#">
          <svg class="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"></path>
          </svg>
          UNIQLO
          </a>
        </div>
        <div className='w-full flex flex-row justify-end items-center'>
          <Link to={`/user/${uid}/wishlists`}>
                <svg class="h-6 mx-2 w-6 fill-current hover:text-black"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                </svg>
          </Link>
          <Link to={`/user/${uid}/cart`}>
              <svg className="fill-current hover:text-black mx-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"></path>
                  <circle cx="10.5" cy="18.5" r="1.5"></circle>
                  <circle cx="17.5" cy="18.5" r="1.5"></circle>
              </svg>
          </Link>
          <button className='flex flex-col items-center justify-center'>
            <svg className="fill-current hover:text-black mx-2" onClick={handleOnclicked} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                <circle fill="none" cx="12" cy="7" r="3"></circle>
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
            </svg>
            {
              clicked && (
              <div className='absolute mt-72 mr-6 group px-2 bg-[#f9fafe] border border-gray-200 shadow-md rounded-md w-44 h-60 text-[#374151]'>
                  <div className='w-full flex flex-row items-center justify-center py-5 px-2 border-b border-gray-200'>
                    <div className='w-2/5 flex justify-center'>
                      <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="profile" className='rounded-full w-8 h-8 object-cover'/>
                    </div>
                    <span className='flex w-3/5 text-m font-bold items-start'>{user && user.fname}</span>
                  </div>
                  <div className='flex flex-col justify-center items-center py-3 font-medium border-b border-gray-200'>
                    <Link className='py-2' to={'/'}>Profile</Link>
                    <Link className='py-2' to={'/'}>Orders</Link>
                  </div>
                  <div className='flex items-center justify-center'>
                    <Link className='flex flex-row ml-2 items-center justify-center py-4' to={'/'}>
                      <span className='font-medium mr-2'>Logout</span>
                      <svg fill="none" className="" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                    </Link>
                  </div>
              </div>)}
          </button>
        </div>
    </header>
  )
}

export default Header