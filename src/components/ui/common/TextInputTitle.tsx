import { ChangeEvent } from "react"

type TextInputTitle = {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  title: string;
}

function TextInputTitle({handleChange, title}: TextInputTitle) {
  const initials = (title[0] && title[1]) && `${title[0]}${title[1]}`
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          {initials || title[0]}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="TextInputTitle-text border-b border-gray-200 focus-within:border-indigo-600">
            <label htmlFor="title" className="sr-only">
            </label>
            <textarea
              onChange={handleChange}
              id="title"
              name="title"
              rows={1}
              placeholder="Book Title..."
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
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

export default TextInputTitle