// eslint-disable-next-line no-restricted-imports
import { useEffect, useLayoutEffect } from 'react'

export const useEnhancedEffect = import.meta.env.SSR ? useEffect : useLayoutEffect
