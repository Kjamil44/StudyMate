import React, { useState } from 'react'

const useInput = (validateValue: (value: any) => any) => {
    const [enteredValue, setEnteredValue] = useState<string | undefined>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const valueIsValid: boolean = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    }


    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {value: enteredValue, isValid: valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset};
    
}

export default useInput