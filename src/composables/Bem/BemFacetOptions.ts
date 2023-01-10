/**
 * BEM interface props
 */
export interface UseBemProps {
  facets?: Array<string>
}

/**
 * BEM separators
 */
interface BemMarkers {
  bemElementMarker?: string
  bemModifierMarker?: string
}

/**
 * BEM class parts including separators and names
 */
export interface BemClassParts extends BemMarkers {
  blockName?: string
  elementName?: string
  modifierName?: string
}

/**
 * Facet utils options
 */
export interface BemFacetOptions extends BemMarkers {
  defaultFacet?: string
}

/**
 * BEM mixin options
 */
export interface BemMixinOptions extends BemFacetOptions {
  useProp?: boolean
}
