import dynamic from 'next/dynamic'

const FormClient = dynamic(() => import('@/components/rehome/FormClient'), { ssr: false })

export default function Form() {
  return <FormClient />
}
