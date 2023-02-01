import { computed, onMounted, ref } from 'vue'

export interface UseIsMountedEmits {
  (e: 'mounted'): void
}

export default function useIsMounted(emit?: (event: 'mounted', ...args: Array<unknown>) => void) {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true

    if (emit) {
      emit('mounted')
    }
  })

  return {
    isMounted: computed<boolean>(() => isMounted.value),
  }
}
