import { computed } from 'vue'
import type { BemMixinOptions, UseBemProps } from '@/composables/Bem/BemFacetOptions'
import { createBemClass, DEFAULT_OPTIONS, mapFacets } from '@/composables/Bem/util'

export default function useBem<TProps extends UseBemProps>(bemRoot: string, props: TProps, config: BemMixinOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    useProp: true,
    ...config,
  }

  const bemFacets = computed(() => mapFacets(bemRoot, props.facets ?? [], options))

  const bemAdd = (modifierName: string, elementName?: string, rootName?: string) => {
    if (!modifierName) {
      return ''
    }

    const blockName = rootName || bemRoot
    return createBemClass({ blockName, modifierName, elementName, ...options })
  }

  return {
    bemRoot,
    bemFacets,
    bemAdd,
  }
}
