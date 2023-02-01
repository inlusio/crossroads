// @ts-ignore
import YarnBound from 'yarn-bound/src'
import type { DialogResultContentData, DialogResultMarkup } from '@/models/DialogResult/DialogResult'
import { DialogResultType } from '@/models/DialogResult/DialogResult'
import DialogResultText from '@/components/DialogResultText/DialogResultText.vue'
import DialogResultOptionList from '@/components/DialogResultOptionList/DialogResultOptionList.vue'
import DialogResultCommand from '@/components/DialogResultCommand/DialogResultCommand.vue'
import DialogResultEnd from '@/components/DialogResultEnd/DialogResultEnd.vue'
import { DialogCharacter } from '@/models/DialogCharacter/DialogCharacter'
import { DialogResultTextFacet } from '@/models/DialogResultTextFacet/DialogResultTextFacet'

export default function useDialogResult() {
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
        return DialogResultText as unknown as string
      case result instanceof YarnBound.OptionsResult:
        return DialogResultOptionList as unknown as string
      case result instanceof YarnBound.CommandResult:
        return DialogResultCommand as unknown as string
      case result === undefined:
        return DialogResultEnd as unknown as string
      default:
        throw new Error('Unknown Yarn result type!')
    }
  }

  const getResultFacets = (textResult: DialogResultContentData): Array<string> => {
    const result: Array<string> = []
    const charName = getCharacter(textResult.markup)
    const [char] = Object.entries(DialogCharacter).find(([_key, value]) => value === charName) ?? []

    if (char) {
      result.push(DialogResultTextFacet[char as keyof typeof DialogResultTextFacet])
    }

    textResult.hashtags
      .filter((hashtag) => Object.keys(DialogResultTextFacet).includes(hashtag))
      .map((hashtag) => DialogResultTextFacet[hashtag as keyof typeof DialogResultTextFacet])
      .forEach((facet) => result.push(facet))

    return result
  }

  return {
    getCharacter,
    getResultType,
    getResultComponent,
    getResultFacets,
  }
}
