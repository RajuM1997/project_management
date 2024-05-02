import create from "zustand";

const useProjectStore = create((set) => ({
  projectName: "",
  setProjectName: (newName) => set({ projectName: newName }),
}));

export default useProjectStore;
