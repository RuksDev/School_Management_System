

"use client";

import { deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";
import type { FormContainerProps } from "./FormContainer";
import { useFormState } from "react-dom";

// Map of delete actions for different tables
const deleteActionMap = {
  subject: deleteSubject,
  class: deleteSubject,
  teacher: deleteSubject,
  student: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

// Lazy load the forms to improve performance
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => (
    <div className="w-full h-full bg-white p-4 rounded-lg flex items-center justify-center">
      <h1 className="text-xl font-semibold text-[#1393E2] animate-pulse">
        Loading...
      </h1>
    </div>
  ),
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => (
    <div className="w-full h-full bg-white p-4 rounded-lg flex items-center justify-center">
      <h1 className="text-xl font-semibold text-[#1393E2] animate-pulse">
        Loading...
      </h1>
    </div>
  ),
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => (
    <div className="w-full h-full bg-white p-4 rounded-lg flex items-center justify-center">
      <h1 className="text-xl font-semibold text-[#1393E2] animate-pulse">
        Loading...
      </h1>
    </div>
  ),
});

// Map of form components for different tables
const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

// Define the props for the FormModel component
const FormModel = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  // Determine the size and background color of the button based on the type
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-ruksYellow"
      : type === "update"
        ? "bg-ruksSkyBlue"
        : "bg-ruksPurple";

  // State to control the visibility of the modal
  const [open, setOpen] = useState(false);

  // Debug: Log when the button is clicked to open the modal
  const handleOpenModal = () => {
    console.log(`Opening modal for table: ${table}, type: ${type}`);
    setOpen(true);
  };

  // Define the Form component to render the appropriate form based on the type
  const Form = () => {
    // Use useFormState to handle the delete action
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    // Show a toast notification and close the modal on successful deletion
    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    // Debug: Log when the Form component is rendered
    console.log(`Rendering form for table: ${table}, type: ${type}`);

    return type === "delete" && id ? (
      // Render the delete confirmation form
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          Caution! All data will be lost. Are you sure want to delete this{" "}
          {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none self-center w-max transform transition-all duration-300 ease-in-out hover:bg-red-800 hover:scale-105 hover:shadow-lg hover:animate-pulse">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      // Render the create or update form
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor} hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md focus:outline-none`}
        onClick={handleOpenModal}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {/* Modal to display the form */}
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xlg:w-[50%] 2xlg:w-[40%]">
            <Form />
            {/* Close button for the modal */}
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;