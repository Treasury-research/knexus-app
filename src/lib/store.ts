import { create } from "zustand";
// import { ethers } from "ethers";
import { ReactNode } from "react";

interface IBucket {
	name: string,
	id: string
}
interface IGroup {
	name: string,
	id: string
}

interface AppState {
	buckets: IBucket [] | [],
	setBuckets: (bucket: IBucket) => void,
	groups: IGroup [] | [],
	setGroups: (group: IGroup) => void
	comModalOpen: boolean;
	setComModalOpen: (comModalOpen: boolean) => void;
	groupModalOpen: boolean;
	setGroupModalOpen: (groupModalOpen: boolean) => void;
}

export const useStore = create<AppState>()((set) => ({
	buckets: [],
	setBuckets: (bucket: IBucket) => set(({ buckets }) => ({ buckets: [...buckets, bucket]})),
	groups: [],
	setGroups: (group: IGroup) => set(({ groups }) => ({ groups: [...groups, group]})),
	comModalOpen: false,
	setComModalOpen: (comModalOpen: boolean) => set({ comModalOpen }),
	groupModalOpen: false,
	setGroupModalOpen: (groupModalOpen: boolean) => set({ groupModalOpen })
}));
