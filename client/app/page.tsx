import Image from 'next/image'
import NavBar from './components/navbar'
import Homepage from './(homepageComponents)/homepage'

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API


export default function Home() {
    console.log('Home component rendering')

  return (
    <div className='min-h-screen flex flex-col bg-slate-300'>
        <Homepage />
    </div>
  )
}
