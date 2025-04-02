"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, type SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name,
      id: data?.id, //Initialize ID when updating
    },
  });

// AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, action] = useFormState(
    type === "create" ? createSubject: updateSubject,
    {
    success: false,
    error: false,
  });

  const onSubmit = handleSubmit((data) => {
    // Validate and sanitize data using the Zod schema
    action(data); // calls create or update based on action
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form action="" className="flex flex-col" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold mb-6">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4 flex-wrap mb-8">
          <InputField
            label="Subject Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
            placeholder="Chemistry"
          />
        </div>
      </div>
      {state.error && (
        <span className="text-red-500 animate-fadeInShake ">
          Something went wrong!
        </span>
      )}
      <button
        type="submit"
        className="relative rounded px-5 py-2.5 overflow-hidden group bg-[#1393E2] hover:bg-[#1177B8] text-white transition-all ease-out duration-300 mt-6"
      >
        <span className="absolute right-0 w-full h-32 -mt-12 transition-all duration-1000 transform translate-x-full bg-white opacity-10 rotate-12 group-hover:-translate-x-full ease"></span>
        <span className="relative">
          {type === "create" ? "Create" : "Update"}
        </span>
      </button>
    </form>
  );
};

export default SubjectForm;
