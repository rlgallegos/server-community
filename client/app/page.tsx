import Image from 'next/image'
import NavBar from './components/components'

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col bg-slate-300'>
        <NavBar />
        <div>
            <h1>The Home Page</h1>
        </div>
    </div>
  )
}
