import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkDown>{issue?.description}</ReactMarkDown>
      </Card>
    </div>
  );
};

export default IssueDetails;
