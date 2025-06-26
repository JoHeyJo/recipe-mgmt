import { TextAreaProps } from "../../../utils/props";

function TextArea({id,name, rows, placeholder, defaultValue, handleChange}: TextAreaProps){
  return (
    <textarea
      onChange={handleChange}
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      className="block w-full resize-none focus:border-input-highlight border-0 border-b p-0 pb-2 focus:ring-0 sm:text-sm sm:leading-6"
      defaultValue={defaultValue}
    />
  );
}

export default TextArea;