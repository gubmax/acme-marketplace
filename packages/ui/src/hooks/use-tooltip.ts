import { useMemo, useRef } from 'react'
import { useBoolean } from 'react-use/esm'
import {
	arrow,
	autoUpdate,
	flip,
	offset,
	type Placement,
	shift,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
} from '@floating-ui/react'

export interface TooltipOptions {
	initialOpen?: boolean
	placement?: Placement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function useTooltip({
	initialOpen = false,
	placement = 'top',
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useBoolean(initialOpen)
	const arrowRef = useRef<HTMLDivElement>(null)

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [offset(12), flip(), shift({ padding: 12 }), arrow({ element: arrowRef })],
	})

	const context = data.context

	const hover = useHover(context, { move: false, enabled: controlledOpen == null })
	const focus = useFocus(context, { enabled: controlledOpen == null })
	const dismiss = useDismiss(context)
	const role = useRole(context, { role: 'tooltip' })

	const interactions = useInteractions([hover, focus, dismiss, role])

	return useMemo(
		() => ({
			arrowRef,
			open,
			setOpen,
			...data,
			...interactions,
		}),
		[data, interactions, open, setOpen],
	)
}
