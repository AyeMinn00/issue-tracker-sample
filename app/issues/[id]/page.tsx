import { authOptions } from '@/app/auth/authOptions'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import { Metadata } from 'next'

type Props = {
    params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    if (isNaN(Number(id))) notFound()

    const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!issue) notFound()

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className={session ? 'md:col-span-4' : 'md:col-span-5'}>
                <IssueDetail issue={issue} />
            </Box>
            {session &&
                <Box>
                    <Flex direction='column' gap='2'>
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            }

        </Grid>
    )
}

export const metadata: Metadata = {
    title: 'Issue Tracker Detail',
    description: 'Detail Page'
}

export default IssueDetailPage