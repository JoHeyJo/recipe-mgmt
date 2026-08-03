import { isDisabled } from "@testing-library/user-event/dist/utils";
import { InputWithLabelFormProps } from "../../utils/props";
/** Handles form input and label
 *
 * [Login, SignUp, Share] -> InputWithLabelForm
 */
function InputWithLabelForm({
  type,
  name,
  id,
  className,
  handleChange,
  value,
  required,
  styles,
  isDisabled
}: InputWithLabelFormProps) {
  return (
    <>
      <label htmlFor={id} className={`${className}-label`}>
        {name}
      </label>
      <input
        disabled={isDisabled}
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
