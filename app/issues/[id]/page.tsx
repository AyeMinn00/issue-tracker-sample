import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'

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
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetail issue={issue} />
            </Box>
            <Box>
                <Flex direction='column' gap='2'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage