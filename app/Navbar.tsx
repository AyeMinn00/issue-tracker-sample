'use client'
import { Avatar, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
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

    return (
        <nav className='border-b mb-5 px-5 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex gap='5' align={'center'}>
                        <Link href='/'><AiFillBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

export default Navbar

const NavLinks = () => {

    const currentPath = usePathname()

    const links: LinkItem[] = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <Flex gap='3'>
            <ul className='flex space-x-6'>
                {links.map(lnk =>
                    <li key={lnk.href} className={classNames({
                        'nav-link': true,
                        '!text-zinc-900': currentPath === lnk.href,
                    })}>
                        <Link href={lnk.href}>{lnk.label}</Link>
                    </li>
                )}
            </ul>
        </Flex>
    )
}

const AuthStatus = () => {

    const { status, data: session } = useSession()

    if (status === 'loading')
        return <div>Loading...</div>

    if (status === 'unauthenticated')
        return <Link href='/api/auth/signin' className='nav-link'>Log In</Link>

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src={session!.user!.image!} fallback="?"
                    size='2' radius='full' className='cursor-pointer'
                    referrerPolicy='no-referrer' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size='2'>
                        {session!.user!.email}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}