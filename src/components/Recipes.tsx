import "../styles/Recipes.css";

const items = [
  { id: 1, recipe: "item 1" },
  { id: 2, recipe: "item 2" },
  { id: 3, recipe: "item 3" },
  // More items...
]
//  border-red-500
function Recipes() {
  return (
    <ul role="list" id="Recipes-container" className="border-2 divide-y divide-gray-200 flex-1">
      {items.map((item) => (
        <li key={item.id} className="border-1 pt-6 py-4">
          {item.recipe}
        </li>
      ))}
    </ul>
  )
}

export default Recipes
