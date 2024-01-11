import { IssueBage } from "@/app/components"
import { Issue } from "@prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"

const IssueDetail = ({ issue }: { issue: Issue }) => {
    return (
        <Flex direction='column' gap='4'>
            <Heading>{issue.title}</Heading>
            <Flex gap='3'>
                <IssueBage status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                {issue.description}
            </Card>
        </Flex>
    )
}

export default IssueDetail