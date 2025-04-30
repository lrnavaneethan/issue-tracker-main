"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createdIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueFormData = z.infer<typeof createdIssueSchema>;
//for genetating the interface from the zod schema

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createdIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsLoading(false);
      setError("Error creating an issue");
    }
  });

  return (
    <>
      <div className="max-w-xl">
        {error && (
          <Callout.Root className="mb-5" color="red">
            <Callout.Icon>
              <RxInfoCircled />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form className=" space-y-3" onSubmit={onSubmit}>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="title"
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description..." {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button disabled={isLoading}>
            Submit New Issue {isLoading && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default IssueForm;
