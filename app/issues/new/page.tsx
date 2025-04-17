'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from '@radix-ui/themes';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RxInfoCircled } from "react-icons/rx";



const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;

}

const NewIssue = () => {
  const router = useRouter();
  const [error,setError] = useState('');

  const { register, control, handleSubmit } = useForm<IssueForm>()

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
      })}>
      
      <TextField.Root placeholder="title"  {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) =>
          <SimpleMDE placeholder="Description..." {...field} />
        
      }/>

      <Button>Submit New Issue</Button>
    </form>
      </div>
          </>
  );
};

export default NewIssue;
