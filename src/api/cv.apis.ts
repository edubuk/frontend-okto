import { CvFormDataType } from "@/forms/CvForm";
import { Cv_resoponse_type } from "@/types";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BACKNED_URL;
export const useCV = () => {
  const navigate = useNavigate();
  const createCV = async (
    formData: CvFormDataType
  ): Promise<Cv_resoponse_type> => {
    const response = await fetch(`${API_BASE_URL}/cv/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Could not create cv at the moment try again latter");
    }
    return response.json();
  };

  const {
    mutateAsync: createCVInBackend,
    isLoading,
    data,
    isSuccess,
  } = useMutation(createCV, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (isSuccess) {
    const { _id: id } = data;
    navigate(`/cv/${id}`);
  }

  return { createCVInBackend, isLoading, data };
};
