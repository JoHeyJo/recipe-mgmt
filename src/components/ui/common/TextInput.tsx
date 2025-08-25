import { InputWithLabelProps } from "../../../utils/props";

/** Renders Input
 *
 * [TitleInput, Search] ->TextInput
 */
function TextInput({
  id,
  name,
  value,
  handleUpdate,
  type,
  placeholder,
}: InputWithLabelProps) {
  return (
    <div>
        <input
          // required={name === "title"}
          onChange={handleUpdate}
          value={value || ""}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md bg-accent border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
        />
    </div>
  );
}

export default TextInput;
