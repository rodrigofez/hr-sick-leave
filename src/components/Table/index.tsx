import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import styles from './styles.module.scss';

import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';
import IconButton from '../IconButton';
import { TableProps } from './types';

const pageSizeOptions = [10, 20, 30, 40, 50];

const Table = <T,>({
	data,
	columns,
	globalFilter,
	setGlobalFilter,
	columnVisibility,
}: PropsWithChildren<TableProps<T>>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		getSortedRowModel: getSortedRowModel(),
		autoResetAll: false,
		state: {
			columnVisibility,
			globalFilter,
		},
	});

	return (
		<div className={styles.tableContainer}>
			<div className={styles.tableInnerContainer}>
				<table className={styles.table}>
					<thead className={styles.head}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr className={styles.headRow} key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<div
													className={styles.headHeader}
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}{' '}
													{{
														asc: <ChevronUpIcon />,
														desc: <ChevronDownIcon />,
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={styles.paginationContainer}>
				<span className={styles.pageCursor}>
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</span>

				<div className={styles.buttonsContainer}>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{pageSizeOptions.map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
					<IconButton
						icon={<DoubleArrowLeftIcon />}
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					/>
					<IconButton
						icon={<ChevronLeftIcon />}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					/>

					<IconButton
						icon={<ChevronRightIcon />}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					/>
					<IconButton
						icon={<DoubleArrowRightIcon />}
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					/>
				</div>
			</div>
		</div>
	);
};

export default Table;
