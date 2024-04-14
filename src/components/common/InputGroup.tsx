import DropDownWithSearch from './DropDownWithSearch';
import InputWithLabelTW from './InputWithLabelTW';
function InputGroup() {
  return (
    <div>
      <div className="d-flex-col mt-2 block w-full rounded-md border-0 p-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <DropDownWithSearch />
        <InputWithLabelTW type={"text"} name={"ingredient"} id={"ingredient"} title={"Ingredient"} />
      </div>
    </div>
  )
}

export default InputGroup;
