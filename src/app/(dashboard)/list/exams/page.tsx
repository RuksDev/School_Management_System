import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, examsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import type { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam &  {lesson: {
  subject : Subject,
  class : Class,
  teacher : Teacher,
}}

const columns = [
  {
    header: "Subject Name",
    accessor: "subject",
  },

  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher Name",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];
const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-ruksPurpleLight "
    >
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      <td className="hidden md:table-cell">{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
      <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/classes/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-ruksSkyBlue ">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link> */}
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-ruksPurple ">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <>
              <FormModel table="exam" type="update" data={item} />
              <FormModel table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.lesson = {teacherId: value};
            break;
          case "classId":
            query.lesson = {classId : parseInt(value)};
            break;
          case "search":
            query.lesson = {
              subject: { 
                name: {contains: value, mode: "insensitive"},
              }
            }
            break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: {select: {name: true}},
            teacher: {select: {name: true, surname: true}},
            class: {select: {name: true}},
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.exam.count({ where: query }),
  ]);
  

  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto m-2 ">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-ruksYellow hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-ruksYellow hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <bu0tton className="w-8 h-8 flex items-center justify-center rounded-full bg-ruksYellow hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </bu0tton>
              <FormModel table="exam" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
