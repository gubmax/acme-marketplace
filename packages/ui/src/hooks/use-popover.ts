import { useMemo, useState } from 'react'
import { useBoolean } from 'react-use/esm'
import {
	autoUpdate,
	flip,
	offset,
	type Placement,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from '@floating-ui/react'

export interface PopoverOptions {
	initialOpen?: boolean
	placement?: Placement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function usePopover({
	initialOpen = false,
	placement = 'bottom',
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useBoolean(initialOpen)
	const [labelId, setLabelId] = useState<string | undefined>()
	const [descriptionId, setDescriptionId] = useState<string | undefined>()

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const onOpenChange = (val: boolean) => {
		setUncontrolledOpen(val)
		setControlledOpen?.(val)
	}

	const data = useFloating({
		placement,
		open,
		onOpenChange,
		whileElementsMounted: autoUpdate,
		middleware: [offset(8), flip(), shift({ padding: 12 })],
	})

	const context = data.context

	const click = useClick(context, { enabled: controlledOpen == null })
	const dismiss = useDismiss(context)
	const role = useRole(context)

	const interactions = useInteractions([click, dismiss, role])

	return useMemo(
		() => ({
			open,
			labelId,
			descriptionId,
			setOpen,
			setLabelId,
			setDescriptionId,
			...data,
			...interactions,
		}),
		[data, descriptionId, interactions, labelId, open, setOpen],
	)
}
