import { issueSchema } from "@/app/validationSchema";
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const body = await request.json()
    const validation = issueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 400 })

    const { title, description } = body
    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title: title,
            description: description
        }
    })

    return NextResponse.json(updatedIssue)
}