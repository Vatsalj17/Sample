import React from 'react'
import assets from '../assets/assets'
import HomeNavbar from '../Components/HomeNavbar'

const Home = () => {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${assets.s5})` }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10">
        <HomeNavbar />
        {/* You can add more content here */}
      </div>
    </div>
  )
}

export default Home
