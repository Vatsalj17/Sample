import React from 'react'
import Navbar from '../Components/Navbar'
import assets from '../assets/assets'

const Home = () => {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${assets.s3})` }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        {/* You can add more content here */}
      </div>
    </div>
  )
}

export default Home
