import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

/** Component responsible for toggling function that adds/removes dark class on HTML element */
function ToggleColorScheme() {
  function toggleColorScheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light"; // Persist the selected theme on refresh
  }

  return (
    <button type="button" onClick={toggleColorScheme}>
      <FontAwesomeIcon icon={faLightbulb} />
    </button>
  );
}

export default ToggleColorScheme;
