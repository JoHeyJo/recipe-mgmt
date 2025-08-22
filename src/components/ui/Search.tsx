import { useState, ChangeEvent, useEffect } from "react";
import { SearchProps } from "../../utils/props";
import TextInput from "../ui/common/TextInput";
import { Recipe } from "../../utils/types";

/** Allows user to search and filter a list
 *
 * MainContainer -> Search
 */
function Search({ list, filter }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value
    setQuery(value)
  }
  const filteredList = list.filter((item) => {
    console.log("item",item)
    if(!item) item.name.includes(query)
  });

  console.log("fileted list",filteredList)

  useEffect(()=>{
    filter(filteredList)
    console.log("triggering filter!@!!")
  },[query])

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
