'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import app from "@/shared/FirebaseConfig"
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export default function FormClient() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [success, setSuccess] = useState(false)
  const { data: session, status } = useSession()
  const db = getFirestore(app)
  const storage = getStorage(app)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setInputs((values) => ({
        ...values,
        userName: session.user.name,
        userImage: session.user.image,
        userEmail: session.user.email
      }))
    }
  }, [session, status])

  useEffect(() => {
    if (submit) {
      savePost()
    }
  }, [submit])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      const storageRef = ref(storage, "pet-pics/" + file.name)
      uploadBytes(storageRef, file)
        .then(() => {
          console.log("Uploaded a blob or file!")
        })
        .then(() => {
          getDownloadURL(storageRef).then((url) => {
            setInputs((values) => ({ ...values, image: url }))
            setSubmit(true)
          })
        })
    }
  }

  const savePost = async () => {
    await setDoc(doc(db, "pets", Date.now().toString()), inputs)
    setSuccess(true)
    setInputs({})
    setFile(null)
    setSubmit(false)

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Inputs */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={inputs.name || ""}
            onChange={handleChange}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="breed"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            required
            value={inputs.breed || ""}
            onChange={handleChange}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={inputs.age || ""}
            onChange={handleChange}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={inputs.location || ""}
            onChange={handleChange}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select your pet type
          </label>
          <select
            id="category"
            name="category"
            required
            value={inputs.category || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select pet type</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Parrot</option>
            <option>Rabbit</option>
            <option>Fish</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            name="description"
            required
            value={inputs.description || ""}
            onChange={handleChange}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tell us more about your pet..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload pet image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="user_avatar"
            name="petImage"
            required
            onChange={handleFileChange}
            type="file"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Pet
        </button>
      </form>
      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 text-green-800 bg-green-100 rounded-lg">
          Pet added successfully!
        </div>
      )}
    </div>
  )
}
