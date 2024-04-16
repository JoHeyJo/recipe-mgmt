import DropDownWithSearch from './DropDownWithSearch';

/** Renders Comboboxes for ingredient input  
 * 
 * Modal -> InputGroup
*/
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
