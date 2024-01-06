'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames'

type LinkItem = {
    label: string,
    href: string
}

const Navbar = () => {

    const currentPath = usePathname()

    const links: LinkItem[] = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='flex space-x-8 border-b mb-5 px-5 h-14 items-center'>
            <Link href='/'><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(lnk =>
                    <li key={lnk.href} className={classNames({
                        'text-blue-600': currentPath === lnk.href,
                        'text-zinc-500': currentPath !== lnk.href,
                        'hover:text-zinc-800 transition-colors': true
                    })}>
                        <Link href={lnk.href}>{lnk.label}</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar