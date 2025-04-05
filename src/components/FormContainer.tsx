

import prisma from "@/lib/prisma";
import FormModel from "./FormModel";

// Define the props for the FormContainer component
export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  // Initialize an empty object to store related data (e.g., teachers for subjects)
  let relatedData = {};

  // Fetch related data only if the operation is not "delete"
  if (type !== "delete") {
    switch (table) {
      case "subject":
        // Fetch all teachers from the database to populate the dropdown
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        // Debug: Log the fetched teachers to ensure they are retrieved correctly
        console.log("Fetched teachers in FormContainer:", subjectTeachers);
        relatedData = { teachers: subjectTeachers };
        break;
      default:
        break;
    }
  }

  return (
    <div className="">
      {/* Render the FormModel component with the fetched related data */}
      <FormModel
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;