import { type IconProps, withIcon } from '../../hocs/with-icon/with-icon.js'

function DoneIcon(props: IconProps) {
	return (
		<svg viewBox="0 -960 960 960" {...props}>
			<path d="M382-362.131l334.696-334.695Q730.37-710.5 749.141-710.5q18.772 0 32.446 13.674t13.674 32.446q0 18.771-13.674 32.445L414.065-264.413Q400.391-250.739 382-250.739t-32.065-13.674L178.413-435.935q-13.674-13.674-13.294-32.445.381-18.772 14.055-32.446T211.62-514.5q18.771 0 32.445 13.674L382-362.131z" />
		</svg>
	)
}

export default withIcon(DoneIcon)
