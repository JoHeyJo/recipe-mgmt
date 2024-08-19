import { ChangeEvent } from "react";

type InputWithLabelForm = {
  type: string;
  name: string
  id: string;
  className: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required: boolean;
}

/** Handles form input and label  
 * 
 * [Login, SignUp] -> InputWithLabelForm
*/
function InputWithLabelForm({ type, name, id, className, handleChange, value, required }: InputWithLabelForm) {
  return (
    <>
      <label htmlFor={id} className={`${className}-label`}>{name}</label>
      <input
        type={type}
        id={id}
        className={`${className}-input`}
        onChange={handleChange}
        value={value}
        required={required}
      />
    </>
  )
}

export default InputWithLabelForm;
