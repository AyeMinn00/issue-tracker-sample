import { IssueBage } from '@/app/components'
import prisma from '@/prisma/client'
import { Button, Card, Flex, Grid, Heading, Text, Box } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

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
        <Grid columns={{ initial: '1', md: '2' }} gap="5">
            <Flex direction='column' gap='2'>
                <Heading>{issue.title}</Heading>
                <Flex gap='3'>
                    <IssueBage status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    {issue.description}
                </Card>
            </Flex>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`} />
                    Edit Issue
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage