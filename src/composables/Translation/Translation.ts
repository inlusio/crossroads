import { useI18n } from 'vue-i18n'

export default function useTranslation() {
  const i18n = useI18n({ useScope: 'global' })

  const t = (path: string, interpolations?: Record<string, unknown>) => {
    return i18n.t(path, interpolations ?? {})
  }

  return {
    t,
  }
}
