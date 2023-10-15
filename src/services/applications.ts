import { AxiosResponse } from 'axios';
import { api } from '../utils/api';
import {
	Application,
	PatchApplication,
	PostApplication,
	PostApplicationResponse,
} from '../types/applications';

export const getApplications = (): Promise<Application[]> => {
	return api
		.get(`applications`)
		.then((response: AxiosResponse<Application[]>) => response.data);
};

export const getApplicationsByEmployee = (
	employeeId: number
): Promise<Application[]> => {
	return api
		.get(`applications/employee/${employeeId}`)
		.then((response: AxiosResponse<Application[]>) => response.data);
};

export const createApplication = (
	employeeId: number,
	application: PostApplication
): Promise<PostApplicationResponse> => {
	return api
		.post(`applications/${employeeId}`, application)
		.then((response: AxiosResponse<PostApplicationResponse>) => response.data);
};

export const updateApplication = (
	applicationId: number,
	application: PatchApplication
): Promise<PostApplicationResponse> => {
	return api
		.patch(`applications/${applicationId}`, application)
		.then((response: AxiosResponse<PostApplicationResponse>) => response.data);
};

export const deleteApplication = (id: number): Promise<void> => {
	return api.delete(`applications/${id}`);
};
