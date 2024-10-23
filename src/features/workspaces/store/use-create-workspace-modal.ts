import { atom, useAtom } from "jotai";

const modalState = atom(false);

// global state management
export const useCreateWorkspaceModal = () => {
  return useAtom(modalState);
};
