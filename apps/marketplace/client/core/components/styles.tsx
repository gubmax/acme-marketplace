import { useRenderContext } from 'client/core/entry-route-context.js'

function Styles() {
	const { styles } = useRenderContext()

	return (
		<>
			{styles.map(({ content, ...rest }, index) => {
				if (content)
					return <style key={index} {...rest} dangerouslySetInnerHTML={{ __html: content }} />
				return <style key={index} {...rest} />
			})}
		</>
	)
}

export default Styles
