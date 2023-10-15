import {
	ColumnDef,
	PaginationState,
	VisibilityState,
} from '@tanstack/react-table';

export type TableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	globalFilter: string;
	setGlobalFilter: (value: string) => void;
	pagination?: PaginationState;
	columnVisibility?: VisibilityState;
};
