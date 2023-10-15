import React, { useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';

import styles from './styles.module.scss';

import {
	FilePlusIcon,
	MagnifyingGlassIcon,
	Pencil1Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
	getApplications,
	getApplicationsByEmployee,
} from '../../services/applications';
import { Role, useAuthStore } from '../../stores/authStore';
import { Application } from '../../types/applications';
import { api } from '../../utils/api';
import ApplicationFormModal from './components/ApplicationFormModal';

const TextCell = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.cell}>{children}</div>;
};

const DateCell = ({ date }: { date: string | Date }) => {
	return <div className={styles.cell}>{new Date(date).toDateString()}</div>;
};

const ActionsCell = ({
	onDelete,
	onEdit,
}: {
	onDelete: () => void;
	onEdit: () => void;
}) => {
	return (
		<div style={{ display: 'flex', gap: '8px' }}>
			<IconButton icon={<Pencil1Icon />} onClick={onEdit} />
			<IconButton variant="danger" icon={<TrashIcon />} onClick={onDelete} />
		</div>
	);
};

function ApplicationsScreen() {
	const [role, employeeId] = useAuthStore((state) => [
		state.role,
		state.employeeId,
	]);
	const isHrEspecialist = role === Role.HR_ESPECIALIST;

	const columns = React.useMemo<ColumnDef<Application>[]>(
		() => [
			{
				header: 'Application',
				footer: (props) => props.column.id,
				columns: [
					{
						accessorKey: 'id',
						header: () => 'ID',
						footer: (props) => props.column.id,
					},
					{
						accessorKey: 'medicalDiagnostic',
						header: () => 'Medical Diagnostic',
						footer: (props) => props.column.id,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
					},
					{
						accessorKey: 'medicalUnit',
						header: () => 'Medical Unit',
						footer: (props) => props.column.id,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
					},
					{
						accessorKey: 'createdAt',
						header: () => 'Application Date',
						footer: (props) => props.column.id,
						cell: (info) => <DateCell date={info.getValue()} />,
					},
					{
						accessorKey: 'doctorName',
						header: () => 'Doctor',
						footer: (props) => props.column.id,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
					},
					{
						accessorKey: 'coverageDays',
						header: () => 'Coverage Days',
						footer: (props) => props.column.id,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
					},
					{
						accessorKey: 'startDate',
						header: () => 'Start Date',
						footer: (props) => props.column.id,
						cell: (info) => <DateCell date={info.getValue()} />,
					},
					{
						accessorKey: 'endDate',
						header: () => 'End Date',
						footer: (props) => props.column.id,
						cell: (info) => <DateCell date={info.getValue()} />,
					},
				],
			},

			{
				header: 'Employee',
				footer: (props) => props.column.id,

				columns: [
					{
						id: 'firstName',
						accessorFn: (row) => row.employee.firstName,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
						footer: (props) => props.column.id,
						header: () => <span>First Name</span>,
					},
					{
						id: 'lastName',
						accessorFn: (row) => row.employee.lastName,
						cell: (info) => <TextCell>{info.getValue()}</TextCell>,
						header: () => <span>Last Name</span>,
						footer: (props) => props.column.id,
					},
				],
			},
			{
				id: 'actions',
				enableHiding: false,
				cell: ({ row }) => (
					<ActionsCell
						onDelete={() => setRowToDelete(row.getValue('id'))}
						onEdit={() => setSelectedApplication(row.original)}
					></ActionsCell>
				),
			},
		],
		[]
	);

	const [isOpen, setIsOpen] = useState(false);
	const [rowToDelete, setRowToDelete] = useState<number>();

	const [selectedApplication, setSelectedApplication] = useState<
		Application | undefined
	>(undefined);

	const { data, isLoading, refetch, isError } = useQuery({
		queryKey: ['applications'],
		queryFn: async () => getApplications(),
		enabled: isHrEspecialist,
	});

	const {
		data: dataByEmployee,
		isLoading: isLoadingByEmployee,
		refetch: refetchByEmployee,
		isError: isErrorByEmployee,
	} = useQuery({
		queryKey: ['applications'],
		queryFn: async () => getApplicationsByEmployee(employeeId ?? 0),
		enabled: !isHrEspecialist,
	});

	const { mutate: deleteApplication, isLoading: isDeleting } = useMutation(
		(id: number) => api.delete(`applications/${id}`),
		{
			onSuccess: () => {
				toast.success('Application deleted');
				isHrEspecialist ? refetch() : refetchByEmployee();
				setRowToDelete(undefined);
			},
			onError: () => {
				toast.error('Error deleting application');
				setRowToDelete(undefined);
			},
		}
	);

	const [globalFilter, setGlobalFilter] = useState('');

	if (
		(isHrEspecialist && isLoading) ||
		(!isHrEspecialist && isLoadingByEmployee)
	)
		return <div>Loading...</div>;

	if ((isHrEspecialist && isError) || (!isHrEspecialist && isErrorByEmployee))
		return <div>Error</div>;

	return (
		<>
			<div
				style={{
					paddingBottom: '24px',
					display: 'flex',
					justifyContent: 'flex-end',
					alignContent: 'center',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<Input
					icon={<MagnifyingGlassIcon />}
					placeholder="Search"
					onChange={(e) => setGlobalFilter(e.target.value)}
				/>
				<Button
					style={{ width: '160px' }}
					variant="primary"
					onClick={() => setIsOpen(true)}
				>
					<FilePlusIcon /> Add new
				</Button>
			</div>
			<Table
				data={isHrEspecialist ? data ?? [] : dataByEmployee ?? []}
				columns={columns}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				columnVisibility={{
					firstName: isHrEspecialist,
					lastName: isHrEspecialist,
				}}
			/>
			<ApplicationFormModal
				isOpen={isOpen || !!selectedApplication}
				initialState={selectedApplication}
				onClose={() => {
					setSelectedApplication(undefined);
					isOpen && setIsOpen(false);
				}}
				onComplete={() => {
					setSelectedApplication(undefined);
					isOpen && setIsOpen(false);
				}}
			/>
			<Modal
				open={!!rowToDelete}
				locked={false}
				onClose={() => setRowToDelete(undefined)}
			>
				<h4>Are you sure you want to delete this?</h4>
				This action cannot be undone.
				<div
					style={{
						display: 'flex',
						gap: '8px',
						marginTop: '16px',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						isLoading={isDeleting}
						variant="danger"
						onClick={() => deleteApplication(rowToDelete ?? 0)}
					>
						Delete
					</Button>
					<Button onClick={() => setRowToDelete(undefined)}>Cancel</Button>
				</div>
			</Modal>
		</>
	);
}

export default ApplicationsScreen;
