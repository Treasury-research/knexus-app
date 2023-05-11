import { create } from "zustand";
// import { ethers } from "ethers";
import { ReactNode } from "react";

interface AppState {
	comModalOpen: boolean;
	setComModalOpen: (comModalOpen: boolean) => void;
}

export const useStore = create<AppState>()((set) => ({
	comModalOpen: false,
	setComModalOpen: (comModalOpen: boolean) => set({ comModalOpen })
}));
