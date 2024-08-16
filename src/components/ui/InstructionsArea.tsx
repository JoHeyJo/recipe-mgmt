import DropDownWithSearch from "../selectors/DropDownWithSearch"

export default function InstructionsArea() {
  return (
    // <div>
    //   <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
    //     Add your comment
    //   </label>
      <div className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
        <DropDownWithSearch name={'Ingredients'} handleOptionChange={() => { }} options={[]} handleAddOption={() => { }} />
        <DropDownWithSearch name={'Ingredients'} handleOptionChange={() => { }} options={[]} handleAddOption={() => { }} />
        <DropDownWithSearch name={'Ingredients'} handleOptionChange={() => { }} options={[]} handleAddOption={() => { }} />
      </div>
    // </div>
  )
}
