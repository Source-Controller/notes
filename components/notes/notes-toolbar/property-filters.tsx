import { useAtomValue } from "jotai"

import { propertiesOfTagsAtom } from "../providers"
import { InputFilter } from "./input-filter"

export function PropertyFilters() {
  const properties = useAtomValue(propertiesOfTagsAtom)
  return (
    <div className="flex gap-2">
      {Object.keys(properties).map((property, index) => {
        if (typeof properties[property] === "string") {
          return <InputFilter property={property} index={index} />
        }
        return <></>
      })}
    </div>
  )
}
