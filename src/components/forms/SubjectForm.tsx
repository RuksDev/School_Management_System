

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

// Define the props for the SubjectForm component
const SubjectForm = ({
  type, // "create" or "update" to determine the form's mode
  data, // Existing subject data (for update mode)
  setOpen, // Function to close the modal
  relatedData, // Related data like the list of teachers
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  // Initialize the form with react-hook-form and zod for validation
  const {
    register,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name || "", // Pre-fill subject name for update mode
      id: data?.id, // Pre-fill ID for update mode
    },
  });

  // Use useFormState to handle form submission and server-side state
  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    { success: false, error: false, message: undefined },
  );

  const router = useRouter();

  // Show a toast notification and close the modal on successful submission
  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh(); // Refresh the page to reflect the changes
    }
  }, [state, router, type, setOpen]);

  // Debug: Log the relatedData to check if teachers are being passed
  console.log("relatedData in SubjectForm:", relatedData);

  // Extract the teachers array from relatedData
  const teachers = relatedData?.teachers;

  return (
    <form action={formAction} className="flex flex-col">
      {/* Form title based on the mode (create or update) */}
      <h1 className="text-xl font-semibold mb-6">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-4 flex-wrap mb-8">
          {/* Input field for the subject name */}
          <InputField
            label="Subject Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
            placeholder="Chemistry"
          />
          {/* Hidden input for the subject ID (only for update mode) */}
          {type === "update" && (
            <InputField
              label="Id"
              name="id"
              defaultValue={data?.id}
              register={register}
              error={errors?.id}
              hidden
            />
          )}
          {/* Multi-select dropdown for selecting teachers */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 mt-4 mb-6">
            <label className="text-sm text-gray-400 mt-4">Teachers:</label>
            <select
              multiple
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full transition-all duration-300 ease-in-out hover:ring-blue-400 focus:ring-[#1393E2] focus:inner-glow focus:outline-none"
              {...register("teachers")} // Register the field with react-hook-form
              defaultValue={data?.teachers} // Pre-select teachers for update mode
            >
              {/* Add a fallback message if no teachers are available */}
              {!teachers || teachers.length === 0 ? (
                <option value="" disabled>
                  No teachers available
                </option>
              ) : (
                teachers.map(
                  (teacher: { id: string; name: string; surname: string }) => (
                    <option value={teacher.id} key={teacher.id}>
                      {teacher.name + " " + teacher.surname}
                    </option>
                  ),
                )
              )}
            </select>
            {/* Display validation errors for the teachers field */}
            {errors.teachers?.message && (
              <p className="text-red-400 text-xs">
                {errors.teachers.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Display server-side error messages */}
      {state.error && (
        <span className="text-red-500 animate-fadeInShake">
          {state.message || "Something went wrong!"}
        </span>
      )}
      {/* Submit button */}
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