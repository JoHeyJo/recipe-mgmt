import { ChangeEvent } from "react";
import TextArea from "./TextArea";
import BookBadge from "../BookBadge";
type TextInputTitle = {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  title: string;
  isRequired: boolean;
};

/**
 * CreateBook ->TextInputTitle -> TextArea
 */
function TextInputTitle({ handleChange, title, isRequired=false }: TextInputTitle) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <BookBadge title={title} />
      </div>
      <div className="min-w-0 flex-1">
        {/* <form action=""> */}
        <div className="TextInputTitle-text border-b focus-within:border-secondary">
          <label htmlFor="title" className="sr-only"></label>
          <TextArea
            isRequired={isRequired}
            defaultValue={title}
            placeholder="Book Title..."
            rows={1}
            name={"title"}
            id={"title"}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
              <div className="flow-root">
              </div>
              <div className="flow-root">
              </div>
            </div>
            <div className="flex-shrink-0">
            </div>
          </div> */}
        {/* </form> */}
      </div>
    </div>
  );
}

export default TextInputTitle;
