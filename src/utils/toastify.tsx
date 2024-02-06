import { ToastContainer, toast } from "react-toastify";

interface Props {
  status?: "success" | "error";
  message?: string;
  functionToastify?: () => void;
}

export const Toastify = ({
  status = "error",
  message = "Please check and try again.",
  functionToastify = () => null,
}: Props) => {
  if (status === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  if (status === "success" && functionToastify) {
    setTimeout(() => {
      functionToastify();
    }, 1000);
  }
};
