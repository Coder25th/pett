'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { deleteDoc, doc, getDocs, getFirestore, query, collection, where } from 'firebase/firestore'
import app from '@/shared/FirebaseConfig'
import PetItem from '@/components/Adopt/PetItem'

function PetInfo() {
  const { data: session } = useSession()
  const [userPet, setUserPet] = useState([])
  const [deleteMessage, setDeleteMessage] = useState('')
  const db = getFirestore(app)

  useEffect(() => {
    getUserPet()
  }, [session])

  const getUserPet = async () => {
    if (session?.user.email) {
      setUserPet([])

      const q = query(collection(db, "pets"), where("userEmail", "==", session?.user.email))
      const querySnapshot = await getDocs(q)

      const pets = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        pets.push(data)
      })

      setUserPet(pets)
    }
  }

  const onDeletePet = async (id) => {
    await deleteDoc(doc(db, "pets", id))
    setDeleteMessage('Pet deleted successfully!')
    getUserPet() // Refresh the pet list
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-[35px] font-bold'>Manage your <span className='text-blue-700'>Pet Info</span></h1>
      </div>
      {deleteMessage && <div className='text-green-500 text-center my-3'>{deleteMessage}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 sm:px-7 md:px-10 mt-9">
        {userPet && userPet.map((item) => (
          <div key={item.id}>
            <PetItem pet={item} />
            <button onClick={() => onDeletePet(item.id)} className='bg-red-500 mt-3 p-3 w-full rounded-md text-white'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetInfo
