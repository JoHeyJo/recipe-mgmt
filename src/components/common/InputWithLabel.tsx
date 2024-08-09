import { useState } from 'react';

type InputWithLabel = {
  handleUpdate: (data: string, section: string) => void;
  value: string;
}

function InputWithLabel({ handleUpdate, value }: InputWithLabel) {
  const [title, setTitle] = useState<string>("");

  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
        Recipe Name
      </label>
      <div className="mt-2">
        <input
          onChange={(e)=>handleUpdate(e.target.value, "name")}
          value={value}
          id="title"
          name="title"
          type="title"
          placeholder=" Awesome recipe"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}

export default InputWithLabel;