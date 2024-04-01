const items = [
  { id: 1, recipe: "item 1" },
  { id: 2, recipe: "item 2" },
  { id: 3, recipe: "item 3" },
  // More items...
]

function Recipes() {
  return (
    <ul role="list" className="border-2 border-red-500 divide-y divide-gray-200 flex-1 bg-blue-100">
      {items.map((item) => (
        <li key={item.id} className="border-2 border-yellow-500 py-4">
          {item.recipe}
        </li>
      ))}
    </ul>
  )
}

export default Recipes
