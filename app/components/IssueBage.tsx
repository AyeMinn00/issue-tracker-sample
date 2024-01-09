import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap : Record<Status, { label : string , color : 'red' | 'green' | 'yellow' }> = {
    OPEN : { label : 'Open' , color : 'red'},
    IN_PROGRESS : { label : 'In Progress' , color : 'yellow'},
    CLOSE : { label : 'close' , color : 'green'},
}

const IssueBage = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
}

export default IssueBage