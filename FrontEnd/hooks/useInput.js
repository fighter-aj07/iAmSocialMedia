import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setisTouched] = useState(false);

  const valueisValid = validateValue(enteredValue);
  const hasError = !valueisValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const BlurHandler = (event) => {
    setisTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setisTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueisValid,
    hasError: hasError,
    valueChangeHandler,
    BlurHandler,
    reset,
  };
};

export default useInput;
