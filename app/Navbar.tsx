'use client'
import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";

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
        <nav className='border-b mb-5 px-5 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex gap='5' align={'center'}>
                        <Link href='/'><AiFillBug /></Link>
                        <Flex gap='3'>
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
                        </Flex>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log in</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default Navbar