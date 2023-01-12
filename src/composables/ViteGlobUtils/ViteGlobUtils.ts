import { basename } from 'node:path'

export default function useViteGlobUtils() {
  const mapToIds = (modules: Record<string, unknown>, ext: string) => {
    const converted = Object.entries(modules).map(([key, value]) => {
      return [basename(key, ext), value]
    })

    return Object.fromEntries(converted)
  }

  // path.basename('/foo/bar/baz/asdf/quux.html', '.html');

  return { mapToIds }
}
