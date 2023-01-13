if (import.meta.env.VITE_DEBUG) {
  console.info('Loaded env vars:')
  console.info(import.meta.env)
}

export default function useDebug() {
  return {
    isDev: import.meta.env.VITE_ENV_NAME === 'development',
    isDebug: import.meta.env.VITE_DEBUG === 'True',
  }
}
