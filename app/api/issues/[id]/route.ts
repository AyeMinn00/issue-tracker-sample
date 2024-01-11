import { issueSchema } from "@/app/validationSchema";
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import delay from 'delay';


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

export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }) {

    if (isNaN(Number(id))) return NextResponse.json({ error: 'Issue Not Found' }, { status: 404 })
    await delay(4000)
    const issueId = parseInt(id)
    const foundIssue = await prisma.issue.findUnique({
        where: {
            id: issueId
        }
    })

    if (!foundIssue) return NextResponse.json({ error: 'Issue Not Found' }, { status: 404 })

    const deleted = await prisma.issue.delete({
        where: {
            id: issueId
        }
    })
    return NextResponse.json(deleted)

}

