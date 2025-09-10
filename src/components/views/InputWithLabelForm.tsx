import { ChangeEvent } from "react";
import { InputWithLabelFormProps } from "../../utils/props";
/** Handles form input and label
 *
 * [Login, SignUp] -> InputWithLabelForm
 */
function InputWithLabelForm({
  type,
  name,
  id,
  className,
  handleChange,
  value,
  required,
  styles
}: InputWithLabelFormProps) {
  return (
    <>
      <label htmlFor={id} className={`${className}-label`}>
        {name}
      </label>
      <input
        type={type}
        id={id}
        className={`${className}-input ${styles}`}
        onChange={handleChange}
        value={value}
        required={required}
      />
    </>
  );
}

export default InputWithLabelForm;
