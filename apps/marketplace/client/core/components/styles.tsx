import { useRenderer } from 'client/core/render-context.js'

function Styles() {
	const { styles } = useRenderer()

	return (
		<>
			{styles?.map(({ content, ...rest }, index) => {
				if (content)
					return <style key={index} {...rest} dangerouslySetInnerHTML={{ __html: content }} />
				return <style key={index} {...rest} />
			})}
		</>
	)
}

export default Styles
