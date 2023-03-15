import Swal from "sweetalert2";
import { TFunction } from "next-i18next";

export const Error = (t: TFunction, message: string) => {
  const title = t("validation.error.label");
  const text = t(message);
  const confirmButtonText = t("validation.error.button");

  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText,
  });
};
