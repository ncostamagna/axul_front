import Swal from "sweetalert2";
import { TFunction } from "next-i18next";

export type ConfirmObject = {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  value: boolean;
};
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

export const ConfirmDialog = async (
  t: TFunction,
  message: string,
  valueContat?: string
): Promise<boolean> => {
  const m = `${t(message)}${valueContat != undefined ? " " + valueContat : ""}`;
  const confirmButtonText = t("delete.confirm.button");
  const result = await Swal.fire<ConfirmObject>({
    title: m,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
  });

  return result.isConfirmed;
};
