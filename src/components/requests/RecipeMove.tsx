import PopOut from "../ui/common/PopOut";

/** Request Component 
 * 
 * RecipesList -> RecipeMove -> PopOut
*/
function RecipeMove({ isDialogOpen, onCloseDialogPanel }) {
  return (
    <PopOut isDialogOpen={isDialogOpen} onCloseDialog={onCloseDialogPanel}>
      <div className="dropdown">
        <button
          className="dropdown-btn"
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          Select an option
        </button>
        <ul className="dropdown-menu" role="listbox">
          <li role="option" data-value="profile">
            Profile
          </li>
          <li role="option" data-value="settings">
            Settings
          </li>
          <li role="option" data-value="logout">
            Logout
          </li>
        </ul>
      </div>
    </PopOut>
  );
};

export default RecipeMove;