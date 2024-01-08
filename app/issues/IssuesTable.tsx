import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import Issue from './Issue'

type Issue = {
    id: number,
    title: string,
    description: string,
}

const IssuesTable = async () => {

    const issuesApi = await fetch('http://localhost:3000/api/issues', {
        cache: 'no-cache'
    })
    const issues: Issue[] = await issuesApi.json()

    return (
        <div>
            {
                issues.map((ise) => <Issue key={ise.id} title={ise.title} description={ise.description} />)
            }
        </div>
    )
}

export default IssuesTable