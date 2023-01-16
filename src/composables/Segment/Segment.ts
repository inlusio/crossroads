import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Point, Rect, SegmentFeatures, SegmentMatrix } from '@/models/Segment/Segment'

const defaultRect = ref<Rect>({ x: 0, y: 0, width: 1, height: 1 })
const defaultParts = [1, 1] as SegmentMatrix

export default function useSegment(area: Ref<Rect> = defaultRect, parts: SegmentMatrix = defaultParts) {
  const segments = computed<Array<Rect>>(() => {
    const result: Array<Rect> = []
    const w = area.value.width / parts[0]
    const h = area.value.height / parts[1]

    for (let i = 0; i < parts[0]; i++) {
      for (let j = 0; j < parts[1]; j++) {
        result.push({
          x: area.value.x + w * i,
          y: area.value.y + h * j,
          width: w,
          height: h,
        })
      }
    }

    return result
  })

  const getSegmentIdxOfPoint = (target: Point) => {
    return segments.value.findIndex(({ x, y, width, height }) => {
      return target.x > x && target.x <= x + width && target.y > y && target.y <= y + height
    })
  }

  const getSegmentFeatures = (seg: number): SegmentFeatures => {
    const col = Math.floor(seg / parts[1])
    const row = seg % parts[0]

    return { seg, col, row }
  }

  return {
    segments,
    getSegmentIdxOfPoint,
    getSegmentFeatures,
  }
}
