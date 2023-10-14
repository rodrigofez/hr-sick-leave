import axios, { AxiosRequestHeaders } from 'axios';
import { useAuthStore } from '../stores/authStore';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(async (config) => {
	const authStore = useAuthStore.getState();
	const token = authStore.accessToken;
	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		} as AxiosRequestHeaders;
	}
	return config;
});
