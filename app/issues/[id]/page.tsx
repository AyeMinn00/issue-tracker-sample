import IssueBage from '@/app/components/IssueBage'
import prisma from '@/prisma/client'
import { Button, Card, Flex, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    if (isNaN(Number(id))) notFound()
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!issue) notFound()

    return (
        <Flex gap='8'>
            <Flex direction='column' grow='1' gap='3'>
                <h4>{issue.title}</h4>
                <Flex gap='3' align='center'>
                    <IssueBage status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    {issue.description}
                </Card>
            </Flex>
            <Flex direction='column' gap="3" shrink='0'>
                <Button color='violet'>{'Edit Issue'}</Button>
                <Button color='red'>{'Delete Issue'}</Button>
            </Flex>
        </Flex >
    )
}

export default IssueDetailPage