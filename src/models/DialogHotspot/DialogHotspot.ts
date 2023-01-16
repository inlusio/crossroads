import { DialogCommand } from '@/models/DialogCommand/DialogCommand'
import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'

export interface DialogHotspot {
  x: number
  y: number
  label: string
  commandData: DialogResultCommandData
}
