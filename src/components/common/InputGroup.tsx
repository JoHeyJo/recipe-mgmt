import DropDownWithSearch from './DropDownWithSearch';
import InputWithLabelTW from './InputWithLabelTW';
function InputGroup() {
  return (
    <div className="flex rounded-md border-2">
        <DropDownWithSearch />
        <DropDownWithSearch />
        <DropDownWithSearch />
      </div>
  )
}

export default InputGroup;
