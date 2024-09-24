import dynamic from 'next/dynamic'

const PetItemClient = dynamic(() => import('../PetItemClient'), { ssr: false })

export default function PetItem({ pet }) {
  return <PetItemClient pet={pet} />
}
