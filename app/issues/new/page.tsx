'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const createIssue = async (data: IssueForm) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError('An expected error occurred!')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='max-w-xl '>
            {error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit((data) => createIssue(data))}>
                <TextField.Root>
                    <TextField.Input placeholder='Your Issue' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage