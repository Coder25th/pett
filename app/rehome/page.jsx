import React from 'react'
import dynamic from 'next/dynamic'

const RehomeClient = dynamic(() => import('@/components/RehomeClient'), { ssr: false })

export default function Rehome() {
  return <RehomeClient />
}
