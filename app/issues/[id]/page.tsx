import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';
import { RxPencil1 } from 'react-icons/rx';
import Link from 'next/link';

interface Props {
    params :{id : string}
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }});
    if (!issue) notFound();
//    await delay(2000);

  return (
   <Grid columns={{initial:'1',md:'2'}} gap='4'>
          <Box>
          <Heading>{issue?.title}</Heading>
          <Flex gap='4' my="2">
            <IssueStatusBadge status={issue.status} /> 
            <Text>{ issue?.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose' >
              <ReactMarkDown>{issue?.description}</ReactMarkDown>
          </Card>
          </Box>
          <Box>
          <Button>
              <RxPencil1 />
              <Link href={`/issues/${issue.id}/edit`}>Edit Button
              </Link>
              </Button>
          </Box>
   </Grid>
    
  )
}

export default IssueDetailsPage