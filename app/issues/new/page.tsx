'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RxInfoCircled } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { createdIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";



const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createdIssueSchema>
//for genetating the interface from the zod schema

const NewIssue = () => {
  const router = useRouter();
  const [error,setError] = useState('');

  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createdIssueSchema)
  })

  return (

    <>
      <div className="max-w-xl">
        {error && (
          <Callout.Root className="mb-5" color="red">
            <Callout.Icon>
            <RxInfoCircled />
            </Callout.Icon>
            <Callout.Text>
              { error}
            </Callout.Text>
          </Callout.Root>
        )}


    <form className=" space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setError('Error creating an issue')
        }
      })}
>
          <TextField.Root placeholder="title"  {...register('title')} />
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
      <Controller
        name="description"
        control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description..." {...field} />
            )}
          />
          <ErrorMessage>
            {errors.description?.message}
        </ErrorMessage>

      <Button>Submit New Issue</Button>
    </form>
      </div>
          </>
  );
};

export default NewIssue;
