export type Point = { x: number; y: number }

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface SegmentFeatures {
  seg: number
  row: number
  col: number
}

export type SegmentMatrix = [cols: number, rows: number]
