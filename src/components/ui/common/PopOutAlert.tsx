import { Dialog, DialogBackdrop } from "@headlessui/react";
import { PopOutAlertProps } from "../../../utils/props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import InputWithLabelForm from "../../views/InputWithLabelForm";
import { PillButton } from "../PillButton";

/** PopOut overlay on grey dialog screen
 *
 * ShareBook -> PopOutAlert -> InputWithLabelFrom
 */
function PopOutAlert({
  isDialogOpen,
  handleClose,
  handleChange,
  value,
  text,
}: PopOutAlertProps) {
  return (
    <Dialog open={isDialogOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed h-full inset-0 z-10 w-screen">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            id="alert-border-1"
            className="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
            role="alert"
          >
            <div>{text}</div>
            <div>
              <InputWithLabelForm
                type={"user-name"}
                name={"User Name"}
                id={"user-name"}
                className={"user-name"}
                handleChange={handleChange}
                value={value}
                required={true}
                styles={"px-2 border-2 border-solid"}
              />
            </div>
            <button
              onClick={handleClose}
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
        <PillButton action={"submit"}/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default PopOutAlert;
