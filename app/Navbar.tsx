import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";

type LinkItem = {
    label: string,
    href: string
}

const Navbar = () => {

    const links: LinkItem[] = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='flex space-x-8 border-b mb-5 px-5 h-14 items-center'>
            <Link href='/'><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(lnk =>
                    <li key={lnk.href} className=''>
                        <Link href={lnk.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{lnk.label}</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar