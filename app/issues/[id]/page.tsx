import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
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
        <Grid columns={{ initial: '1', md: '2' }} gap="5">
            <IssueDetail issue={issue}/>
            <Box>
                <EditIssueButton issueId={issue.id}/>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage