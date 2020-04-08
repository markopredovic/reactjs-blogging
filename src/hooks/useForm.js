import { useState } from "react";

const useForm = (initialData) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      console.log("checkbox");
      setData({ ...data, [e.target.name]: e.target.checked });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return [data, setData, handleChange];
};

export { useForm };
