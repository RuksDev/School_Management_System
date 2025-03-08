import Image from "next/image";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex rounded-full items-center gap-2 ring-[1.5px] ring-gray-300 px-2 text-xs">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search from table..."
        className="w-full p-2 bg-transparent outline-none placeholder:whitespace-normal placeholder:text-wrap"
      />
    </div>
  );
}

export default TableSearch;