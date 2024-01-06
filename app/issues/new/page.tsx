'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root>
                <TextField.Input placeholder='Your Issue' />
            </TextField.Root>
            <SimpleMDE />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage