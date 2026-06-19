import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CopyRecipeToBookDropdown(option, handleSelect, selected) {
  return (
    <>
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
    </>
  );
}

export default CopyRecipeToBookDropdown;
