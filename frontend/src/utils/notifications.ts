import { toast } from "react-toastify";

export const handleError = (message: string) => {
  toast.error(message);
};
