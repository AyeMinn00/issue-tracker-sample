import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'

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
        <IssueForm issue={issue}/>
    )
}

export default IssueEditPage