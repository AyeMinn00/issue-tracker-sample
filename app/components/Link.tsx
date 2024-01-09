import React from 'react'
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
    href : string, 
    label : string 
}

const Link = ({href , label } : Props ) => {
  return (
      <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{label}</RadixLink>
    </NextLink>
  )
}

export default Link