import React from 'react'
import dynamic from 'next/dynamic'

const AdoptClient = dynamic(() => import('@/components/AdoptClient'), { ssr: false })

export default function Adopt() {
    return <AdoptClient />
}
