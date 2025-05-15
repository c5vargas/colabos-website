import type { Member } from '@/contexts/members/libs/types';
import { create } from 'zustand';

interface MembersState {
  members: Member[];
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
  updateMember: (memberId: string, updatedData: Partial<Member>) => void;
  removeMember: (memberId: string) => void;
  clearMembers: () => void;
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],

  setMembers: (members) => set({ members }),

  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),

  updateMember: (memberId, updatedData) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updatedData } : member,
      ),
    })),

  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== memberId),
    })),

  clearMembers: () => set({ members: [] }),
}));
