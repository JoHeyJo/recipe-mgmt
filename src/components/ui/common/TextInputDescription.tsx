import { ChangeEvent } from "react";
import TextArea from "./TextArea";

type TextInputDescription = {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextInputDescription({ handleChange }: TextInputDescription) {
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="TextInputDescription-text border-b focus-within:border-secondary">
            <label htmlFor="description" className="sr-only"></label>
            <TextArea
              defaultValue={""}
              placeholder="Book Description..."
              rows={1}
              name={"description"}
              id={"description"}
              handleChange={handleChange}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
              <div className="flow-root"></div>
              <div className="flow-root"></div>
            </div>
            <div className="flex-shrink-0"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TextInputDescription;
