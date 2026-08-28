import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { DropdownProp } from "../../../utils/props";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book } from "../../../utils/types";
import { truncate } from "../../../utils/functions";
import DropDownOptions from "../DropDownOptions";

/** Renders dropdown Dropdown
 * Note: UI can be abstracted into its own component and and the logical mechanics into their own
 *
 * RecipeRequest does not pass down a selected prop. Hence the guards implemented
 * and the additional styling for when selected === truthy
 * selected is only necessary to indicate which item has been chosen - applicable to BookView & RecipeMove
 *
 * NOTE: can options be acquired through context? Currently, all options are books.
 *
 * [BookView, RecipeRequest, RecipeMove] -> Dropdown
 */
function Dropdown({
  selected,
  options,
  onChange,
  onCreateBook,
  render,
}: DropdownProp) {
  /** Sets option and option id */
  function handleSelect(option: Book) {
    onChange(option.id, option);
  }

  /** Render "CreateBook" - Default book is "Shared Inbox" & user is creating book  */
  // const createBookDropdown = (
  //   <MenuItem key={1}>
  //     <li
  //       onClick={onCreateBook}
  //       className={`relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent`}
  //     >
  //       <span className="block truncate">{"Create book"}</span>
  //     </li>
  //   </MenuItem>
  // );

  const createBookDropdown = (
    <DropDownOptions options={["Create book"]} onAction={onCreateBook} id={1} />
  );

  /** Hides "Shared Inbox" in dropdown when user is selecting a book to copy  */
  const isSharedHidden = (option: Book) => option.book_type !== "shared_inbox";

  /** Render "books except selected book*" - Default book is NOT "Shared Inbox" - User is selecting book to copy to */
  function copyRecipeToDropdown(option) {
    return (
      isSharedHidden(option) && (
        <MenuItem key={option.id}>
          <li
            onClick={() => handleSelect(option)}
            className={`group relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent 
             ${selected?.id === option.id ? "text-gray-700 font-semibold" : "text-gray-700"}`}
          >
            <span className="block truncate">{option.title}</span>
            {selected && selected.id === option.id && (
              <FontAwesomeIcon
                className="text-icon-color group-data-[focus]:text-accent"
                icon={faCheck}
              />
            )}
          </li>
        </MenuItem>
      )
    );
  }

  /** Render "books" - Default book is NOT "Shared Inbox" - User is selecting book to view    */
  function viewBooksDropdown(option) {
    return (
      <MenuItem disabled={option.id === selected.id} key={option.id}>
        <li
          onClick={() => handleSelect(option)}
          className={`group disabled relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent 
            ${selected?.id === option.id ? "text-gray-700 font-semibold" : "text-gray-700"}`}
        >
          <span
            className={`block truncate ${option.id === selected.id && "text-gray-400"}`}
          >
            {option.title}
          </span>
          {selected && selected.id === option.id && (
            <FontAwesomeIcon
              className="text-icon-color group-data-[focus]:text-accent"
              icon={faCheck}
            />
          )}
        </li>
      </MenuItem>
    );
  }

  /** Renders book options User can move to: Authored and collaborative books
   * NOTE: User cannot move to "Shared Recipes" & "View Only" books.
    */
  function moveRecipeDropdown(option) {
    console.log("option:,",option)
    return (
      <MenuItem disabled={option.id === selected.id} key={option.id}>
        <li
          onClick={() => handleSelect(option)}
          className={`group disabled relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent 
            ${selected?.id === option.id ? "text-gray-700 font-semibold" : "text-gray-700"}`}
        >
          <span
            className={`block truncate ${option.id === selected.id && "text-gray-400"}`}
          >
            {option.title}
          </span>
          {selected && selected.id === option.id && (
            <FontAwesomeIcon
              className="text-icon-color group-data-[focus]:text-accent"
              icon={faCheck}
            />
          )}
        </li>
      </MenuItem>
    );
  }

  function renderDropdown() {
    if (render.viewBooks) {
      return options?.map((option) => viewBooksDropdown(option));
    }
    if (render.copyRecipe) {
      return options?.map((option) => copyRecipeToDropdown(option));
    }
    if(render.moveRecipe){
      return options?.filter((option) => )
    }
  }

  function menuButtonLabel(): string {
    if(render.viewBooks){
      return truncate(selected.title, 15);
    }
    if (render.copyRecipe) {
      return "Copy to recipe book:";
    }
    if (render.moveRecipe) {
      return "Move to recipe book:";
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex truncate justify-center gap-x-1.5 rounded-md bg-selected px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-light-border hover:bg-gray-50">
          {menuButtonLabel()}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute z-10 mt-2 w-56 max-h-60 overflow-auto rounded-md bg-primary shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        anchor={selected ? { to: "bottom start" } : { to: "bottom" }}
      >
        <div className="py-1">
          {render.createBook ? createBookDropdown : renderDropdown()}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
