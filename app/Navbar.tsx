'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames'
import { useSession } from 'next-auth/react';

type LinkItem = {
    label: string,
    href: string
}

const Navbar = () => {

    const currentPath = usePathname()
    const { status } = useSession()

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
                <li>{status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>}</li>
                <li>{status === 'unauthenticated' && <Link href='/api/auth/signin'>Log in</Link>}</li>
            </ul>
        </nav>
    )
}

export default Navbar