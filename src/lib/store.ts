import { create } from "zustand";
// import { ethers } from "ethers";
import { ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

interface IBucket {
	name: string,
	id: string
}
interface IGroup {
	name: string,
	key: string,
	description: string,
	children?: [] | IGroup[],
	type: string
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
	groups: [
    { key: uuidv4(), name: 'data', description: '', type: 'bucket',
      children: [
        { name: 'data', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data2', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data3', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data4', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data5', key: uuidv4(), description: 'data des', type: 'data' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '', type: 'bucket',
      children: [
        { name: 'data', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data2', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data3', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data4', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data5', key: uuidv4(), description: 'data des', type: 'data' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '', type: 'bucket',
      children: [
        { name: 'data', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data2', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data3', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data4', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data5', key: uuidv4(), description: 'data des', type: 'data' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '', type: 'bucket',
      children: [
        { name: 'data', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data2', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data3', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data4', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data5', key: uuidv4(), description: 'data des', type: 'data' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '', type: 'bucket',
      children: [
        { name: 'data', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data2', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data3', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data4', key: uuidv4(), description: 'data des', type: 'data' },
        { name: 'data5', key: uuidv4(), description: 'data des', type: 'data' },
      ]
    },
    { key: uuidv4(), name: 'bucket2', description: '', type: 'bucket', }
  ],
	setGroups: (group: IGroup) => set(({ groups }) => ({ groups: [...groups, group]})),
	comModalOpen: false,
	setComModalOpen: (comModalOpen: boolean) => set({ comModalOpen }),
	groupModalOpen: false,
	setGroupModalOpen: (groupModalOpen: boolean) => set({ groupModalOpen })
}));
