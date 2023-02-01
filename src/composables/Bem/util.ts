/** @type {Readonly<BemFacetOptions>} */
import type { BemClassParts } from '@/composables/Bem/BemFacetOptions'

export const DEFAULT_OPTIONS = {
  bemModifierMarker: '--',
  defaultFacet: 'base',
  bemElementMarker: '__',
}

/**
 * Create a valid CSS class out a config object of parts
 * @param {BemClassParts} bemClassParts - All parts of a valid BEM class
 * @return {string} The resulting CSS class
 */
export function createBemClass(bemClassParts: BemClassParts) {
  const { blockName, modifierName = '', elementName = '', bemModifierMarker, bemElementMarker } = bemClassParts

  const elementPart = elementName ? `${bemElementMarker}${elementName}` : ''
  const modifierPart = modifierName ? `${bemModifierMarker}${modifierName}` : ''
  return `${blockName}${elementPart}${modifierPart}`
}

/**
 * Compile a list of class strings from a list of facets
 * @param {string} blockName - Facet root class
 * @param {Array<string>} facets - The facets to be applied the component
 * @param {BemFacetOptions} options - A config object
 * @return {Array<string>} An array of compiled facets
 */
export function mapFacets(blockName: string, facets: Array<string>, options = DEFAULT_OPTIONS) {
  const { defaultFacet, ...rest } = options

  // Apply multiple facets by using an array
  const result = facets.filter(Boolean).map((modifierName) => createBemClass({ blockName, modifierName, ...rest }))

  // As `facet` can still be an empty string, we'll provide a base facet as a fallback
  if (!result.length) {
    return [createBemClass({ blockName, modifierName: defaultFacet, ...rest })]
  }

  return result
}
