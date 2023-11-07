type TextInputProps = {
  name: string;
  placeholder?: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const TextInput = ({
  name,
  placeholder = "",
  change,
  value,
}: TextInputProps) => {
  return (
    <input
      className="rounded bg-slate-50 p-1 text-slate-800"
      name={name}
      id={name}
      type="text"
      placeholder={placeholder}
      onChange={change}
      value={value}
    ></input>
  );
};

export default TextInput;
