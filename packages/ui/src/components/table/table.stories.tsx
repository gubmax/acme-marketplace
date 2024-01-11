import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Avatar from '../avatar/avatar.js'
import DoneIcon from '../icons/done-icon.js'
import { MOCK_TABLE_DATA } from './mock.js'
import Table from './table.js'

const meta: Meta<typeof Table> = {
	title: 'components/table',
	component: Table,
}

export default meta
type Story = StoryObj<typeof Table>

// Basic

interface TableCell {
	id: number
	email: string
	avatar: string
	gender: string
	job: string
	company: string
	ip: string
}

interface ColumnOptions {
	header?: ReactNode
	content: (item: TableCell) => ReactNode
}

const COLUMNS: Record<string, ColumnOptions> = {
	user: {
		header: <div className="flex justify-start">User</div>,
		content: (item) => (
			<div className="flex items-center gap-3">
				<Avatar placeholder={!item.avatar} size="sm">
					<img src={item.avatar} alt="User avatar" className="rounded-full" />
				</Avatar>
				<span className="text-subheading">{item.email}</span>
			</div>
		),
	},
	job: {
		header: <div className="flex justify-end">Job</div>,
		content: (item) => <div className="flex justify-end">{item.job}</div>,
	},
	company: {
		header: <div className="flex justify-end">Company</div>,
		content: (item) => <div className="flex justify-end">{item.company}</div>,
	},
	gender: {
		header: <div className="flex justify-end">Gender</div>,
		content: (item) => <div className="flex justify-end">{item.gender}</div>,
	},
	ip: {
		header: <div className="flex justify-end">IP</div>,
		content: (item) => <div className="flex justify-end">{item.ip}</div>,
	},
	more: {
		content: () => <DoneIcon className="fill-secondary ml-auto" />,
	},
}

const COLUMN_NAMES = Object.keys(COLUMNS)

export const Basic: Story = {
	render: () => {
		return (
			<div className="bg-container rounded-lg p-2">
				<Table className="w-full">
					<Table.Header>
						<Table.Row>
							{COLUMN_NAMES.map((name) => (
								<Table.HeaderCell key={name} className="p-2">
									{COLUMNS[name].header}
								</Table.HeaderCell>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{MOCK_TABLE_DATA.map((item, index) => (
							<Table.Row key={index} className="hover:bg-outline transition-colors">
								{COLUMN_NAMES.map((name, index) => (
									<Table.Cell key={index} className="p-2">
										{COLUMNS[name].content(item)}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		)
	},
}
