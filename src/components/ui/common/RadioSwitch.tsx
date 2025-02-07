import { useState, ChangeEvent } from "react";

type RadioSwitchProps = {
  handleSwitch: (event: ChangeEvent<HTMLInputElement>) => void
}

function RadioSwitch({ handleSwitch }: RadioSwitchProps) {
  const [whichInstructions, setWhichInstructions] = useState("book");
  return (
    <div className="RadioSwitch-radio-buttons flex justify-center">
      <div className="RadioSwitch-radio">
        <label>
          <input type="radio" value="user" onChange={handleSwitch}
            checked={whichInstructions === "user"} />
          User
        </label>
      </div>
      <div className="RadioSwitch-radio">
        <label>
          <input type="radio" value="book" onChange={handleSwitch}
            checked={whichInstructions === "book"} />
          Book
        </label>
      </div>
    </div>
  )
}

export default RadioSwitch;