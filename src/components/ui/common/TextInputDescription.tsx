import { ChangeEvent } from "react"

type TextInputDescription = {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextInputDescription({ handleChange }: TextInputDescription) {

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="TextInputDescription-text border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="description" className="sr-only">
            </label>
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              rows={1}
              placeholder="Book Description..."
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">
              <div className="flow-root">
              </div>
              <div className="flow-root">
              </div>
            </div>
            <div className="flex-shrink-0">
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TextInputDescription