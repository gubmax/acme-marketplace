import { useRenderer } from 'client/core/render-context.js'

function Styles() {
	const { styles } = useRenderer()

	if (import.meta.env.PROD)
		return <>{styles?.map((props, index) => <style key={index} {...props} />)}</>

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
