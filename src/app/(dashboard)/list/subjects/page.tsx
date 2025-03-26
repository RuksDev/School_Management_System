import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import type { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";


type SubjectList = Subject & {teachers: Teacher[]}

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },

  {
    header: "Teachers Names",
    accessor: "teachers",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-ruksPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.teachers.map ((teacher) => teacher.name).join(", ")}</td>
    <td>
      <div className="flex items-center gap-2">
        {/* <Link href={`/list/subjects/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-ruksSkyBlue ">
            <Image src="/edit.png" alt="" width={16} height={16} />
          </button>
        </Link> */}
        {role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-ruksPurple ">
          //   <Image src="/delete.png" alt="" width={16} height={16} />
          // </button>
          <>
          <FormModel table="subject" type="update" data={item}/>
          <FormModel table="subject" type="delete" id={item.id}/>
          </>
        )}
      </div>
    </td>
  </tr>
);
const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
            default:
              break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.subject.count({ where: query }),
  ]);
  return (
    <div className="bg-white rounded-md p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-ruksYellow hover:scale-105 transition-transform duration-200 ease-in-out hover:shadow-md">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModel table="subject" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default SubjectListPage;
