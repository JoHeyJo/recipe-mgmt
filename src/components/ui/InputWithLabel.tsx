type InputWithLabel = {
  handleUpdate: (data: string, section: string) => void;
  value: string;
  id: string;
  name: string;
  type: string
  placeholder: string;
}

function InputWithLabel({ handleUpdate, id, value, name, type, placeholder }: InputWithLabel) {

  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
      </label>
      <div className="mt-2">
        <input
          onChange={(e) => handleUpdate(e.target.value, "name")}
          value={value}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}

export default InputWithLabel;