import { useAtomValue } from "jotai"

import { CustomInput, CustomMultiSelect, CustomSelect } from "../components"
import { typeOfTagsAtom } from "../providers"

export function NoteDialogProperties() {
  const typeOfTags = useAtomValue(typeOfTagsAtom)

  return (
    <div>
      {Object.keys(typeOfTags).map((tag, index) => {
        const tagType = typeOfTags[tag] // type = 'text' | 'select' | 'multiselect'
        switch (tagType) {
          case "text":
            return <CustomInput key={tag} property={tag} index={index} />

          case "select":
            return <CustomSelect key={tag} property={tag} index={index} />

          case "multiselect":
            return <CustomMultiSelect key={tag} property={tag} index={index} />

          default:
            return
        }
      })}
    </div>
  )
}
