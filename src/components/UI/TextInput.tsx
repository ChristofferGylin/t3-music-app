type TextInputProps = {
  name: string;
  placeholder?: string;
};

const TextInput = ({ name, placeholder = "" }: TextInputProps) => {
  return (
    <input
      className="rounded bg-slate-50 p-1 text-slate-800"
      name={name}
      id={name}
      type="text"
      placeholder={placeholder}
    ></input>
  );
};

export default TextInput;
