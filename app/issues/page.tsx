import React from 'react'
import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from '../components/Link' 
import NextLink from 'next/link'
import IssueBage from '../components/IssueBage'

const IssuesPage = async () => {

    const issues = await prisma.issue.findMany()

    return (
        <div>
            <div className='mb-3'>
                <Button>
                    <NextLink href="/issues/new">New Issue</NextLink>
                </Button>
            </div>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`} label={issue.title}/>
                                <div className='block md:hidden' ><IssueBage status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><IssueBage status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )

}

export default IssuesPage