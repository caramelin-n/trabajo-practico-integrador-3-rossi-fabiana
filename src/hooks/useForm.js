import { useState } from "react"

export const useForm = (initialValue) => {
  const [ formValue, setFormValue ] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleReset = () => {
    console.log(formValue);
    setFormValue(initialValue);
  };

  return {
    formValue,
    handleChange,
    handleReset
  }
};
