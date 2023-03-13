import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Contact } from "@/api/contact/api";
import { getDate } from "@/common/format/date";

type useContactsType = {
  selected: number | null;
  idSelected: string | null;
  contacts: Contact[];
  //setIsReady: (isReady: boolean) => void;
  setSelected: (value: string | null) => void;
  setContacts: (contacts: Contact[]) => void;
  clearContacts: () => void;
};

const useContacts = create<useContactsType>()(
  persist(
    (set, get) => ({
      selected: null,
      idSelected: null,
      contacts: [],
      setSelected(value: string | null) {
        set((state) => {
          if (value == null) {
            return { ...state, selected: null, idSelected: null };
          }
          const index = state.contacts.findIndex((contact) => {
            return contact.id == value;
          });
          return { ...state, selected: index, idSelected: value };
        });
      },
      setContacts(contacts: Contact[]) {
        set((state) => ({ ...state, contacts }));
      },
      clearContacts() {
        set((state) => ({
          selected: null,
          contacts: [],
          idSelected: null,
        }));
      },
    }),
    {
      name: "bear-storage",
    }
  )
);
/*
= (set, get) => ({
  
});

const useApplicantStore = create<useContactStoreType>()((...a) => ({
  ...createContacts(...a),
}));

export default useApplicantStore;

import ITodo from "../types/ITodo";

// add

export default createTodoSlice;

interface ITodo {
  todos: Array<string>;
  addTodo: (todo: string) => void;
}

export default ITodo;


const useStore = create<ITodo>()((...a) => ({
  ...createTodoSlice(...a),
}));
*/
export default useContacts;
