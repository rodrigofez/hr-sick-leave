import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Role, useAuthStore } from '../../../stores/authStore';
import {
	Application,
	Employee,
	MedicalUnit,
	PatchApplication,
	PostApplicationForm,
} from '../../../types/applications';
import { api } from '../../../utils/api';

import { toast } from 'sonner';
import * as yup from 'yup';

const schema = yup.object({
	employeeId: yup
		.object()
		.shape({
			value: yup.string().required().label('Employee'),
			label: yup.string().required(),
		})
		.required()
		.label('Employee'),
	medicalUnit: yup
		.object()
		.shape({
			value: yup
				.mixed<MedicalUnit>()
				.oneOf(Object.values(MedicalUnit))
				.required()
				.label('Medical unit'),
			label: yup.string().required(),
		})
		.label('Medical unit'),
	doctorName: yup.string().required().min(3).label('Doctor'),
	coverageDays: yup
		.number()
		.min(1)
		.typeError('Days of coverage must be a number')
		.required(),
	startDate: yup
		.date()
		.typeError('Start date must be a date')
		.required()
		.label('Start date'),
	endDate: yup
		.date()
		.typeError('End date must be a date')
		.min(yup.ref('startDate'), "End date can't be before start date")
		.required()
		.label('End date'),
	medicalDiagnostic: yup.string().required().label('Diagnostic').min(3),
});

const useApplicationForm = ({
	initialState,
	isOpen,
	onComplete,
	onClose,
}: {
	initialState?: Application;
	isOpen: boolean;
	onComplete: () => void;
	onClose: () => void;
}) => {
	const [role, employeeId] = useAuthStore((state) => [
		state.role,
		state.employeeId,
	]);
	const isHrEspecialist = role === Role.HR_ESPECIALIST;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const applicationId = initialState?.id;
	const queryClient = useQueryClient();

	const { mutate: addAplication, isLoading: isCreating } = useMutation(
		({ employeeId, ...data }: PostApplicationForm) =>
			api.post(`applications/${employeeId}`, data),
		{
			onSuccess: () => {
				onComplete();
				reset({}, { keepValues: false });

				toast.success('Application created');
				queryClient.invalidateQueries({ queryKey: ['applications'] });
			},
			onError: () => {
				onComplete();
				reset({}, { keepValues: false });

				toast.error('Error creating application');
			},
		}
	);

	const { mutate: updateApplication, isLoading: isUpdating } = useMutation(
		({
			applicationId,
			...data
		}: PatchApplication & { applicationId: number }) =>
			api.patch(`applications/${applicationId}`, data),
		{
			onSuccess: () => {
				onComplete();
				reset({}, { keepValues: false });

				toast.success('Application updated');
				queryClient.invalidateQueries({ queryKey: ['applications'] });
			},
			onError: () => {
				onComplete();
				reset({}, { keepValues: false });

				toast.error('Error updating application');
			},
		}
	);

	useEffect(() => {
		if (employeeId && !isHrEspecialist && isOpen) {
			console.log('runs this?');
			setValue('employeeId', {
				label: 'Personal',
				value: employeeId.toString(),
			});
		}
	}, [employeeId, setValue, isHrEspecialist, isOpen]);

	useEffect(() => {
		if (initialState)
			reset({
				coverageDays: initialState?.coverageDays,
				doctorName: initialState?.doctorName,
				medicalDiagnostic: initialState?.medicalDiagnostic,
				startDate: new Date(initialState?.startDate)
					.toISOString()
					.substring(0, 10) as unknown as Date,
				endDate: new Date(initialState?.startDate)
					.toISOString()
					.substring(0, 10) as unknown as Date,
				employeeId: {
					value: initialState?.employeeId.toString(),
					label: isHrEspecialist
						? `${initialState?.employee.firstName} ${initialState?.employee.lastName} | DUI: ${initialState?.employee.dui}`
						: 'Personal',
				},
				medicalUnit: {
					value: initialState?.medicalUnit,
					label: initialState?.medicalUnit,
				},
			});
	}, [initialState, reset]);

	const onSubmit = async (data: PostApplicationForm) => {
		if (applicationId)
			updateApplication({
				...data,
				employeeId: isHrEspecialist ? +data.employeeId : employeeId,
				applicationId,
			});
		else
			addAplication({
				...data,
				employeeId: isHrEspecialist ? +data.employeeId : employeeId ?? 0,
			});
	};

	const handleClose = () => {
		reset({}, { keepValues: false });
		onClose();
	};

	const employeeOptions = useQuery(['employee'], () =>
		api.get(`employee`).then((res: AxiosResponse<Employee[]>) =>
			res.data.map((employee) => ({
				value: employee.id,
				label: `${employee.firstName} ${employee.lastName} | DUI: ${employee.dui}`,
			}))
		)
	);
	const isSubmitting = isCreating || isUpdating;

	return {
		register,
		handleClose,
		control,
		errors,
		employeeOptions,
		isSubmitting,
		handleSubmit,
		onSubmit,
		applicationId,
		isHrEspecialist,
	};
};

export default useApplicationForm;
