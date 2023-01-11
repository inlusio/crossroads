//@ts-ignore
import YarnBound from 'yarn-bound/src'
import { ref } from 'vue'
import type { YarnBoundOptions } from '@/models/YarnBound/YarnBound'

export default function useRunner() {
  const runner = ref<YarnBound | null>(null)

  const createRunner = (code: string) => {
    runner.value = new YarnBound({
      dialogue: code,
    } as YarnBoundOptions)
  }

  return {
    runner,
    createRunner,
  }
}
