import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
    params :{id : string}
}

const IssueDetailsPage = async ({ params }: Props) => {
    if (typeof params.id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue)
        notFound();

  return (
    <ul>
          <li>{ issue?.title}</li>
          <li>{ issue?.status}</li>
          <li>{ issue?.description}</li>
          <li>{ issue?.createdAt.toDateString()}</li>
    </ul>
  )
}

export default IssueDetailsPage