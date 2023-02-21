export interface UseAudioTransitionEmits {
  (e: 'playback', flag: boolean): void
}

export default function useAudioTransition(emit: (e: 'playback', flag: boolean) => void) {
  const start = async (audioEl: HTMLAudioElement) => {
    try {
      audioEl.currentTime = 0
      await audioEl.play()
      emit('playback', true)
    } catch (exception) {
      // Audio couldn't be loaded, change state accordingly
      emit('playback', false)
      return await stop(audioEl)
    }
  }

  const stop = async (audioEl: HTMLAudioElement) => {
    await audioEl.pause()
  }

  return {
    start,
    stop,
  }
}
