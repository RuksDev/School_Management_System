"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username Must be at least 3 characters long!" })
    .max(20, { message: "Username Must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});
type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form action="" className="flex flex-col" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold mb-6">Create a new student</h1>

      <div className="flex flex-col">
        {/* Authentication Information Section */}
        <span className="text-xs text-gray-500 font-medium">
          Authentication Information
        </span>
        <div className="flex flex-row justify-between gap-4 flex-wrap mb-8">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
            placeholder="John123"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
            placeholder="john@example.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
          />
        </div>
      </div>

      {/* Personal Information Section */}

      <span className="text-xs text-gray-500 font-medium">
        Personal Information
      </span>
      <div className=" flex flex-row justify-between gap-4 flex-wrap ">
        <InputField
          label="First Name"
          name="first Name"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
          placeholder="John"
        />

        <InputField
          label="Last Name"
          name="last Name"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
          placeholder="Smith"
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
          placeholder="123 4567 890"
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
          placeholder="123 Main St, Anytown, USA"
        />
        <InputField
          label="Blood Type"
          name="blood Type"
          defaultValue={data?.bloodType}
          register={register}
          error={errors?.bloodType}
          placeholder="A+"
        />
        <InputField
          label="Birth Day"
          name="birth Day"
          defaultValue={data?.birthday}
          register={register}
          error={errors?.birthday}
          type="date"
          placeholder="YYYY-MM-DD"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4 mt-4 mb-6">
          <label className="text-sm text-gray-400 mt-4">Sex:</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full transition-all duration-300 ease-in-out hover:ring-blue-400 focus:ring-[#1393E2] focus:inner-glow focus:outline-none"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-red-400 text-xs">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 mt-4 mb-6 justify-center">
          <label
            className="text-sm text-gray-400 mt-4 items-center gap-2 cursor-pointer flex  "
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={26} height={26} />
            <span>Upload a Photo</span>
          </label>
          <input
            type="file"
            id="img"
            {...register("img")}
            className="hidden "
          />

          {errors.img?.message && (
            <p className="text-red-400 text-xs">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Additional input fields for personal info can go here */}
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

export default StudentForm;
