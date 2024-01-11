import { type ForwardedRef, forwardRef, type HTMLAttributes, type TdHTMLAttributes } from 'react'
import { cn } from 'src/helpers/class-names.js'

import './table.css'

export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>

function TableHeader(props: TableSectionProps, ref: ForwardedRef<HTMLTableSectionElement>) {
	const { className, children, ...rest } = props

	return (
		<thead ref={ref} className={cn('ui-table__header', className)} {...rest}>
			{children}
		</thead>
	)
}

function TableHeaderRow(props: TableRowProps, ref: ForwardedRef<HTMLTableRowElement>) {
	const { className, children, ...rest } = props

	return (
		<tr ref={ref} className={cn('ui-table__row', className)} {...rest}>
			{children}
		</tr>
	)
}

// TableBody

function TableBody(props: TableSectionProps, ref: ForwardedRef<HTMLTableSectionElement>) {
	const { className, children, ...rest } = props

	return (
		<tbody ref={ref} className={className} {...rest}>
			{children}
		</tbody>
	)
}

function TableRow(props: TableRowProps, ref: ForwardedRef<HTMLTableRowElement>) {
	const { className, children, ...rest } = props

	return (
		<tr ref={ref} className={cn('ui-table__row', className)} {...rest}>
			{children}
		</tr>
	)
}

// TableCell

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

function TableCell(props: TableCellProps, ref: ForwardedRef<HTMLTableCellElement>) {
	const { className, children, ...rest } = props

	return (
		<td ref={ref} className={cn('ui-table__cell', className)} {...rest}>
			{children}
		</td>
	)
}

// TableHeaderCell

function TableHeaderCell(props: TableCellProps, ref: ForwardedRef<HTMLTableCellElement>) {
	const { className, children, ...rest } = props

	return (
		<th ref={ref} className={cn('ui-table__header-cell', className)} {...rest}>
			{children}
		</th>
	)
}

// Table

export type TableProps = HTMLAttributes<HTMLTableElement>

function Table(props: TableProps, ref: ForwardedRef<HTMLTableElement>) {
	const { className, children, ...rest } = props

	return (
		<table ref={ref} className={cn('ui-table', className)} {...rest}>
			{children}
		</table>
	)
}

export default Object.assign(forwardRef(Table), {
	Header: forwardRef(TableHeader),
	HeaderRow: forwardRef(TableHeaderRow),
	Body: forwardRef(TableBody),
	Row: forwardRef(TableRow),
	HeaderCell: forwardRef(TableHeaderCell),
	Cell: forwardRef(TableCell),
})
