import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'
import { Metadata } from 'next'

type Props = {
    params: { id: string }
}

const IssueEditPage = async ({ params: { id } }: Props) => {

    if (isNaN(Number(id))) notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!issue) notFound()

    return (
        <IssueForm issue={issue} />
    )
}

export const metadata: Metadata = {
    title: 'Issue Tracker Edit',
    description: 'Edit Page'
}

export default IssueEditPage