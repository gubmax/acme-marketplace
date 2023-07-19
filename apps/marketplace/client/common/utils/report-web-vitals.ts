import type { ReportCallback } from 'web-vitals'

export const reportWebVitals = (reportCallback: ReportCallback): void => {
	void import('web-vitals').then((mod) => {
		mod.onCLS(reportCallback)
		mod.onFID(reportCallback)
		mod.onFCP(reportCallback)
		mod.onLCP(reportCallback)
		mod.onTTFB(reportCallback)
	})
}
