// "use server";

// import prisma from "./prisma";

// // Define the type for the current state of the form
// type CurrentState = { success: boolean; error: boolean; message?: string };

// // Server action to create a new subject
// export const createSubject = async (
//   currentState: CurrentState,
//   formData: FormData,
// ) => {
//   try {
//     // Extract form data
//     const name = formData.get("name") as string;
//     const teachers = formData.getAll("teachers") as string[];

//     // Create a new subject in the database
//     await prisma.subject.create({
//       data: {
//         name: name,
//         teachers: {
//           connect: teachers.map((teacherId) => ({ id: teacherId })), // Connect the selected teachers
//         },
//       },
//     });

//     // Uncomment the following line if using Next.js revalidation
//     // revalidatePath("/list/subjects");

//     return { success: true, error: false };
//   } catch (error) {
//     console.log(error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to create subject";
//     return { success: false, error: true, message: errorMessage };
//   }
// };

// // Server action to update an existing subject
// export const updateSubject = async (
//   currentState: CurrentState,
//   formData: FormData,
// ) => {
//   try {
//     // Extract form data
//     const id = formData.get("id") as string;
//     const name = formData.get("name") as string;
//     const teachers = formData.getAll("teachers") as string[];

//     // Update the subject in the database
//     await prisma.subject.update({
//       where: {
//         id: parseInt(id), // Convert string to number since Subject.id is an Int
//       },
//       data: {
//         name: name,
//         teachers: {
//           set: teachers.map((teacherId) => ({ id: teacherId })), // Replace the existing teachers with the new selection
//         },
//       },
//     });

//     // Uncomment the following line if using Next.js revalidation
//     // revalidatePath("/list/subjects");

//     return { success: true, error: false };
//   } catch (error) {
//     console.log(error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to update subject";
//     return { success: false, error: true, message: errorMessage };
//   }
// };

// // Server action to delete a subject
// export const deleteSubject = async (
//   currentState: CurrentState,
//   data: FormData,
// ) => {
//   const id = data.get("id") as string;

//   try {
//     // Delete the subject from the database
//     await prisma.subject.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // Uncomment the following line if using Next.js revalidation
//     // revalidatePath("/list/subjects");

//     return { success: true, error: false };
//   } catch (error) {
//     console.log(error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to delete subject";
//     return { success: false, error: true, message: errorMessage };
//   }
// };

"use server";

import {

  SubjectSchema,

} from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};