export type Application = {
	id: number;
	employeeId: number;
	startDate: Date;
	endDate: Date;
	doctorName: string;
	medicalUnit: MedicalUnit;
	medicalDiagnostic: string;
	coverageDays: number;
	createdAt: Date;
	employee: Employee;
};

export type PostApplication = Omit<
	Application,
	'id' | 'createdAt' | 'employeeId' | 'employee'
>;

export type PostApplicationForm = Omit<
	Application,
	'id' | 'createdAt' | 'employee'
>;

export type PatchApplication = Partial<PostApplicationForm>;

export type PostApplicationResponse = Omit<Application, 'employee'>;

export type Employee = {
	id: number;
	dui: string;
	firstName: string;
	lastName: string;
	position: string;
	startDate: Date;
};

export enum MedicalUnit {
	Isss = 'ISSS',
	Minsal = 'MINSAL',
}
