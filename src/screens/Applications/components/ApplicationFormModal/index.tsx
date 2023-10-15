import { FC } from 'react';
import { Controller } from 'react-hook-form';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';
import SelectInput from '../../../../components/SelectInput';
import TextArea from '../../../../components/TextArea';
import { MedicalUnit } from '../../../../types/applications';
import useApplicationForm from '../../hooks/useApplicationForm';

import styles from './styles.module.scss';
import { Props } from './types';

const medicalUnits = Object.values(MedicalUnit).map((unit) => ({
	value: unit,
	label: unit,
}));

const ApplicationFormModal: FC<Props> = ({ isOpen, ...props }) => {
	const {
		control,
		employeeOptions,
		errors,
		handleClose,
		handleSubmit,
		isSubmitting,
		onSubmit,
		register,
		applicationId,
		isHrEspecialist,
	} = useApplicationForm({ ...props, isOpen });

	const title = applicationId ? 'Update application' : 'Create application';

	if (employeeOptions.isLoading) return <div>Loading...</div>;

	return (
		<Modal open={isOpen} locked={false} onClose={handleClose}>
			<form
				className={styles.form}
				onSubmit={handleSubmit((data) => {
					onSubmit({
						...data,
						employeeId: +data.employeeId.value,
						medicalUnit: data.medicalUnit.value,
					});
				})}
			>
				<h4>{title}</h4>
				{isHrEspecialist && (
					<Controller
						name="employeeId"
						control={control}
						render={({ field }) => (
							<SelectInput
								label="Employee"
								{...{ ...field, ref: undefined }}
								innerRef={field.ref}
								error={!!errors.employeeId?.value}
								errorMessage={errors.employeeId?.value?.message}
								options={employeeOptions.data}
							/>
						)}
					/>
				)}
				<Controller
					name="medicalUnit"
					control={control}
					render={({ field }) => (
						<SelectInput
							label="Medical unit"
							{...{ ...field, ref: undefined }}
							innerRef={field.ref}
							error={!!errors.medicalUnit?.value}
							errorMessage={errors.medicalUnit?.value?.message}
							options={medicalUnits}
						/>
					)}
				/>
				<Input
					error={!!errors.doctorName}
					errorMessage={errors.doctorName?.message}
					register={register('doctorName')}
					label="Doctor name"
				/>
				<Input
					type="number"
					error={!!errors.coverageDays}
					errorMessage={errors.coverageDays?.message}
					register={register('coverageDays')}
					label="Days of coverage"
				/>
				<Input
					error={!!errors.startDate}
					errorMessage={errors.startDate?.message}
					register={register('startDate')}
					label="Start date"
					type="date"
				/>
				<Input
					error={!!errors.endDate}
					errorMessage={errors.endDate?.message}
					register={register('endDate')}
					label="End date"
					type="date"
				/>
				<TextArea
					error={!!errors.medicalDiagnostic}
					errorMessage={errors.medicalDiagnostic?.message}
					register={register('medicalDiagnostic')}
					label="Medical diagnostic"
					cols={30}
					rows={10}
				/>
				<div className={styles.buttonsContainer}>
					<Button isLoading={isSubmitting} type="submit" variant="primary">
						Submit
					</Button>
					<Button disabled={isSubmitting} type="button" onClick={handleClose}>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ApplicationFormModal;
