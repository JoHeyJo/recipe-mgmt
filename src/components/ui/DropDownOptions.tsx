import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type DropDownOptionsProps = {
  options: string[];
  onAction: () => void;
  id: number;
};

function DropDownOptions({ options = [], onAction, id }: DropDownOptionsProps) {
  return (
    <>
      {options.map((option) => (
        <MenuItem key={id}>
          <li
            onClick={onAction}
            className={`relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent`}
          >
            <span className="block truncate">{option}</span>
          </li>
        </MenuItem>
      ))}
    </>
  );
}

export default DropDownOptions