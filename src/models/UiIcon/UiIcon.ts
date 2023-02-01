export const enum UiIcon {
  QuestionMark24 = 'question-mark-24',
  Fullscreen24 = 'fullscreen-24',
  FullscreenExit24 = 'fullscreen-exit-24',
}

export const enum UiIconId {
  QuestionMark = 'QuestionMark',
  Fullscreen = 'Fullscreen',
  FullscreenExit = 'FullscreenExit',
}

export const enum UiIconSizeId {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type MaybeIconId = UiIconId | undefined | null

export interface UiIconEntry {
  id: UiIconId
  size?: UiIconSizeId
  icon: string
}

export type UiIconList = Array<UiIconEntry>
export type UiIconDict = Record<UiIconId, UiIconEntry>

export const uiIconList: UiIconList = [
  {
    id: UiIconId.QuestionMark,
    size: UiIconSizeId.Medium,
    icon: UiIcon.QuestionMark24,
  },
  {
    id: UiIconId.Fullscreen,
    size: UiIconSizeId.Medium,
    icon: UiIcon.Fullscreen24,
  },
  {
    id: UiIconId.FullscreenExit,
    size: UiIconSizeId.Medium,
    icon: UiIcon.FullscreenExit24,
  },
]

export const uiIconDict: UiIconDict = uiIconList.reduce((acc, entry) => {
  acc[entry.id] = entry
  return acc
}, {} as UiIconDict)
