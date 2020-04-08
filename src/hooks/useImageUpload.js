import axios from "axios";

const BASE_URL = "http://localhost:4000/upload";

const useImageUpload = () => {
  const imageUpload = async (image) => {
    const res = await axios.post(BASE_URL, { image });

    console.log("res", res);
  };

  return {
    imageUpload,
  };
};

export { useImageUpload };
