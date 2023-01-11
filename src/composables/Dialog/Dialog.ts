// @ts-ignore
import YarnBound from 'yarn-bound/src'
import type { DialogResultMarkup } from '@/models/Dialog/Dialog'
import { DialogResultType } from '@/models/Dialog/Dialog'
import DialogResultText from '@/components/DialogResultText/DialogResultText.vue'
import DialogResultOptionList from '@/components/DialogResultOptionList/DialogResultOptionList.vue'
import DialogResultCommand from '@/components/DialogResultCommand/DialogResultCommand.vue'
import DialogResultEnd from '@/components/DialogResultEnd/DialogResultEnd.vue'

export default function useDialog() {
  const getCharacter = (markup: Array<DialogResultMarkup>): string | undefined => {
    const name = markup.find(({ name }) => name === 'character')

    if (name) {
      return name.properties.name
    }

    return undefined
  }

  const getResultType = (result: YarnBound.Result | undefined) => {
    switch (true) {
      case result instanceof YarnBound.TextResult:
        return DialogResultType.Text
      case result instanceof YarnBound.OptionsResult:
        return DialogResultType.Options
      case result instanceof YarnBound.CommandResult:
        return DialogResultType.Command
      case result === undefined:
        return DialogResultType.End
      default:
        throw new Error('Unknown Yarn result type!')
    }
  }

  const getResultComponent = (result: YarnBound.Result | undefined): string => {
    switch (true) {
      case result instanceof YarnBound.TextResult:
        return DialogResultText as string
      case result instanceof YarnBound.OptionsResult:
        return DialogResultOptionList as string
      case result instanceof YarnBound.CommandResult:
        return DialogResultCommand as string
      case result === undefined:
        return DialogResultEnd as string
      default:
        throw new Error('Unknown Yarn result type!')
    }
  }

  return {
    getCharacter,
    getResultType,
    getResultComponent,
  }
}
