import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { Link } from "react-router-dom";

export default function Home() {    

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Welcome to Taskify!</h1>
          <p>
            Edit <code>src/App.tsx</code>
          </p>
        <Link className='p-4 hover:underline justify-center' to="/login">Login</Link>
        <Link className='p-4 hover:underline justify-center' to="/register">Register</Link>
        </div>
      </section>

    </>
  )
}