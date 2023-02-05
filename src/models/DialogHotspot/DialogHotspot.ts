import type { DialogResultCommandData } from '@/models/DialogResult/DialogResult'

export interface DialogHotspot {
  x: number
  y: number
  label: string
  commandData: Array<DialogResultCommandData>
}
