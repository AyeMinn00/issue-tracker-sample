'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [isDeleting, setDeleting] = useState(false)

    const deleteIssue = async (id: number) => {
        try {
            setDeleting(true)
            await axios.delete(`/api/issues/${id}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
        } finally {
            setDeleting(false)
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" disabled={isDeleting} >
                    Delete Issue
                    {isDeleting && <Spinner />}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure? This action cannot be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={() => { deleteIssue(issueId) }}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}

export default DeleteIssueButton