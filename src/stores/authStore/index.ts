import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Role {
	HR_ESPECIALIST = 'HR_ESPECIALIST',
	Employee = 'Employee',
}

export type Auth = {
	employeeId?: number;
	userId?: number;
	accessToken?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: Role;
};

export type AuthStore = Auth & {
	setAuth: (auth: Auth) => void;
	logOut: () => void;
};

const initialState = {
	employeeId: undefined,
	userId: undefined,
	accessToken: undefined,
	firstName: undefined,
	lastName: undefined,
	email: undefined,
	role: undefined,
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			...initialState,
			setAuth: (auth: Auth) => set(() => ({ ...auth })),
			logOut: () => set(initialState),
		}),
		{
			name: 'authStore',
		}
	)
);
