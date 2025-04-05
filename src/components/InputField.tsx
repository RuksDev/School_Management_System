import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder?: string;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  placeholder,
  hidden,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 mt-4 w-full md:w-1/4"}>
      <label className="text-sm text-gray-400 mt-4">{label}:</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full transition-all duration-300 ease-in-out hover:ring-blue-400 focus:ring-[#1393E2] focus:inner-glow focus:outline-none"
        placeholder={placeholder}
        defaultValue={defaultValue} // Pass default directly to the constructor
        {...inputProps} // Spread any additional props
      />
      {error?.message && (
        <p className="text-red-400 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;
