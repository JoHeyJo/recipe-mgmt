import { ChangeEvent } from "react";

type RadioSwitchProps = {
  handleSwitch: (event: ChangeEvent<HTMLInputElement>) => void;
  selection: string;
  labelOne: string;
  labelTwo: string;
  valueOne: string; 
  valueTwo: string;
};

function RadioSwitch({ handleSwitch, selection, labelOne, labelTwo, valueOne, valueTwo }: RadioSwitchProps) {
  return (
    <div className="RadioSwitch-radio-buttons flex justify-center">
      <div className="RadioSwitch-radio">
        <label>
          <input
            type="radio"
            value={valueOne}
            onChange={handleSwitch}
            checked={selection === valueOne}
          />
          {labelOne}
        </label>
      </div>
      <div className="RadioSwitch-radio">
        <label>
          <input
            type="radio"
            value={valueTwo}
            onChange={handleSwitch}
            checked={selection === valueTwo}
          />
          {labelTwo}
        </label>
      </div>
    </div>
  );
}

export default RadioSwitch;
