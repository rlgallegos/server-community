import Link from 'next/link'

interface Props {
    image: string
}

export default function NavBar({image}: Props) {
    return (
        <nav className='w-full h-8 flex justify-evenly items-center gap-2 bg-white text-black'>
            <Link href='/'>Home</Link>
            <Link href='/info'>Info</Link>
            <Link href='/profile'>Profile</Link>
            {image &&
                <img src={`data:image/jpeg;base64,${image}`} alt="User Image" />
            }
        </nav>
    )
}