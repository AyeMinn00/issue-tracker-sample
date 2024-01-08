import React from 'react'

type Props = {
    title: string,
    description: string
}

const Issue = ({ title, description }: Props) => {
    return (
        <div className='flex space-x-5 py-2'>
            <h3>{title}</h3>
            <h4>{description}</h4>
        </div>
    )
}

export default Issue