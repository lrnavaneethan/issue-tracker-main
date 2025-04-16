'use client'
import React from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Button } from '@radix-ui/themes';


const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Search the docs…" />
      <SimpleMDE placeholder="Description..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
