import Image from 'next/image'
import NavBar from './components/navbar'
import Homepage from './(homepageComponents)/homepage'

export default function Home() {

  return (
    <div className='min-h-screen flex flex-col bg-slate-300'>
        <NavBar />
        <Homepage />
    </div>
  )
}
