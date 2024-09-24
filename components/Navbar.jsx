"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { FaSearch, FaUser, FaCat } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import Link from 'next/link'
import Image from "next/image";
import { PiDogThin } from "react-icons/pi";

const USER_IMAGE = "https://res.cloudinary.com/di9am2sjn/image/upload/v1726722115/qpf8btnq2kpmagdvmcrp.jpg"

export default function Navbar() {
    const { data: session } = useSession();
    console.log("Session", session);
  return (
    <nav className="content-center bg-transparent m-2 h-14">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <Link href="/">
            <div className="flex items-center">
              <img src="dl.png" className="h-16" alt="logo" />
              <img src="l.png" alt="lt" className="h-7 mt-2" />
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-6 gap-x-6 ml-[-15rem]">
          <ul className="flex space-x-6">
            <li>
              <Link
                className="flex items-center rounded-lg p-2 text-white font-thin hover:text-gray-200 hover:bg-white hover:bg-opacity-5"
                href="/"
              >
                <AiOutlineHome className="mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center rounded-lg p-2 hover:bg-white hover:bg-opacity-5 text-white font-thin hover:text-gray-200"
                href="/adopt"
              >
                <PiDogThin className="mr-1" />
                Adopt
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center rounded-lg p-2 hover:bg-white hover:bg-opacity-5 text-white font-thin hover:text-gray-200"
                href="/rehome"
              >
                <FaCat className="mr-1" />
                Rehome
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center font-thin rounded-lg p-2 hover:bg-white hover:bg-opacity-5 hover:text-gray-200"
                href="/contact"
              >
                <CiMail className="mr-1" />
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className="text-white flex items-center font-thin rounded-lg p-2 hover:bg-white hover:bg-opacity-5 hover:text-gray-200"
                href="/about"
              >
                <AiOutlineTeam className="mr-1" />
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-x-3">
            {!session?<button className="hover:bg-blue-500 hover:text-white px-2 py-1 text-white bg-blue-700 rounded-lg" onClick={() => signIn()}>Login</button> : <button className="hover:bg-red-500 hover:text-white px-2 py-1 bg-red-600 text-white rounded-lg" onClick={() => signOut()}>Logout</button>}
          <div className="flex gap-x-3 p-1 mr-2 rounded-full items-center justify-center">
            <Link href="/pet-info">
              <div className="hover:bg-white hover:bg-opacity-5 hover:text-black p-2 text-white bg-white bg-opacity-5 rounded-full">
                <MdPets />
              </div>
            </Link>
            <Link href="profile">
            {session?<Image className="rounded-full" src={session?session?.user?.image:USER_IMAGE} width={30} height={30} alt="user" />:
              <div className="hover:bg-white hover:bg-opacity-5 hover:text-black p-2 text-white bg-white bg-opacity-5 rounded-full">
              <FaUser />
            </div>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
