import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { RxPencil1 } from "react-icons/rx";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Button>
        <RxPencil1 />
        <Link href={`/issues/${issueId}/edit`}>Edit Button</Link>
      </Button>
    </>
  );
};

export default EditIssueButton;
