const PREFIX = 'Crossroads'

export function useLocalStorage() {
  const getItem = (key: string) => {
    const item = localStorage.getItem(`${PREFIX}.${key}`) || null
    return item ? JSON.parse(item) : null
  }

  const setItem = <T>(key: string, value: T) => {
    localStorage.setItem(`${PREFIX}.${key}`, JSON.stringify(value))
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(`${PREFIX}::${key}`)
  }

  return {
    getItem,
    setItem,
    removeItem,
  }
}
