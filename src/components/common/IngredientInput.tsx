import InputWithLabelTW from './InputWithLabelTW';
import DropDownWithSearch from './DropDownWithSearch';
// REMOVE
function IngredientInput() {
  return (
    <>
      <div >
        {/* <DropDownWithSearch /> */}
        <InputWithLabelTW type={"text"} name={"ingredient"} id={"ingredient"} title={"Ingredient"} />
      </div>
    </>
  )
}

export default IngredientInput;