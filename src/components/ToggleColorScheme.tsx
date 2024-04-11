import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

function ToggleColorScheme() {
  function toggleColorScheme() {
    document.documentElement.classList.toggle('dark');
    console.log("toggled")
  }

  return <button type="button" onClick={toggleColorScheme}><FontAwesomeIcon icon={faLightbulb} /></button>
}

export default ToggleColorScheme;