import { ChangeEvent } from "react";

type RadioSwitchProps = {
  handleSwitch: (event: ChangeEvent<HTMLInputElement>) => void;
  selection: string;
};

function RadioSwitch({ handleSwitch, selection }: RadioSwitchProps) {
  return (
    <div className="RadioSwitch-radio-buttons flex justify-center">
      <div className="RadioSwitch-radio">
        <label>
          <input
            type="radio"
            value="user"
            onChange={handleSwitch}
            checked={selection === "user"}
          />
          User
        </label>
      </div>
      <div className="RadioSwitch-radio">
        <label>
          <input
            type="radio"
            value="book"
            onChange={handleSwitch}
            checked={selection === "book"}
          />
          Book
        </label>
      </div>
    </div>
  );
}

export default RadioSwitch;
