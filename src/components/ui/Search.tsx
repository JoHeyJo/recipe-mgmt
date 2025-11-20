import { useState, ChangeEvent, useEffect } from "react";
import { SearchProps } from "../../utils/props";
import TextInput from "../ui/common/TextInput";

/** Allows user to search and filter a list
 *
 * MainContainer -> Search -> TextInput
 */
function Search({ list, setList }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
  }

  function filterList() {
    const filteredRecipes = list.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLocaleLowerCase())
    );
    setList(filteredRecipes);
  }

  useEffect(() => {
    filterList();
  }, [query, list]);

  return (
    <>
      <TextInput
        id={"null"}
        name={"search"}
        value={query}
        handleUpdate={handleChange}
        type={"recipes-search-bar"}
        placeholder={"Search..."}
      />
    </>
  );
}

export default Search;
