import React from 'react'
import dynamic from 'next/dynamic'

const PetInfoClient = dynamic(() => import('../components/PetInfoClient'), { ssr: false })

export default function PetInfo() {
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-[35px] font-bold'>Manage your <span className='text-blue-700'>Pet Info</span></h1>
      </div>
      <PetInfoClient />
    </div>
  )
}
