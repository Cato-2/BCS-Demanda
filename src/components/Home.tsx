import React from 'react'
import Topnav from './Topnav'
import ExcelToJSON from '../data/ExcelToJson'

function Home() {
  return (
    < >
    <div className='w-auto h-screen bg-[#eff4fb] '>
    <Topnav />
    <div>
        <div className='px-3 py-3'>
            <h1 className='text-xl font-bold'>Dashboard</h1>
            <span className='text-sm text-gray-500'>Bienvenido al dashboard de gestión</span>
        </div>
        <div>
            <ExcelToJSON />
        </div>
    </div>
    </div>
    </>
  )
}

export default Home