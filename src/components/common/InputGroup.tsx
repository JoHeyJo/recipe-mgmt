import DropDownWithSearch from './DropDownWithSearch';
import InputWithLabelTW from './InputWithLabelTW';
function InputGroup() {
  return (
    <div>
      <div className="flex space-x-2">
        <DropDownWithSearch />
        <DropDownWithSearch />
        <DropDownWithSearch />
      </div>
    </div>
  )
}

export default InputGroup;
