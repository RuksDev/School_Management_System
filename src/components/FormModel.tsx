"use client";

import { deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const deleteActionMap = {
  subject: deleteSubject,
  teacher: deleteSubject,
  parent: deleteSubject,
  class: deleteSubject,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
  student: deleteSubject,
};

// This is the lazy loading...
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

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data) => (
    <SubjectForm type={type} data={data} setOpen={setOpen} />
  ),
  teacher: (type, data, setOpen) => (
    <TeacherForm type={type} data={data} setOpen={setOpen} />
  ),
  student: (type, data, setOpen) => (
    <StudentForm type={type} data={data} setOpen={setOpen} />
  ),
};

const FormModel = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "lesson"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-ruksYellow"
      : type === "update"
        ? "bg-ruksSkyBlue"
        : "bg-ruksPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    });

    return type === "delete" && id ? (
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
      forms[table](setOpen, type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor} hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md focus:outline-none`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xlg:w-[50%] 2xlg:w-[40%]">
            <Form />
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
