import dynamic from 'next/dynamic'

const PetItemClient = dynamic(() => import('@/components/PetItemClient'), { ssr: false })

export default function PetItem({ pet }) {
  return <PetItemClient pet={pet} />
}
