import { create } from "zustand";
import { persist } from "zustand/middleware";

type useSpinnerType = {
  spinner: boolean;
  enableSpinner: () => void;
  disableSpinner: () => void;
};

const useSpinner = create<useSpinnerType>()(
  persist(
    (set, get) => ({
      spinner: false,
      enableSpinner() {
        set((state) => {
          return { spinner: true };
        });
      },
      disableSpinner() {
        set((state) => {
          return { spinner: false };
        });
      },
    }),
    {
      name: "spinner-storage",
    }
  )
);

export default useSpinner;
