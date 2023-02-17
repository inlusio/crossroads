const STORAGE_PREFIX = 'Crossroads'
const STORAGE_SEPARATOR = '::'

const join = (...list: Array<string>): string => list.join(STORAGE_SEPARATOR)
const compose = (...list: Array<string>) => join(STORAGE_PREFIX, ...list)

export default function useStorageKey() {
  return {
    join,
    compose,
  }
}
