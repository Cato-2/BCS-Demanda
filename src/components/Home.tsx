import React from 'react'
import Topnav from './Topnav'
function Home() {
  return (
    < >
    <div className='w-auto h-screen bg-[#f2f2f2] '>
    <Topnav />
    <div>
        <div className='px-3 py-3'>
            <h1 className='text-xl font-bold'>Dashboard</h1>
            <span className='text-sm text-gray-500'>Bienvenido al dashboard de gestión</span>
        </div>
        <div>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default Home