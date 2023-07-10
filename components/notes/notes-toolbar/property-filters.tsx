import { useAtomValue } from "jotai"

import { propertiesOfTagsAtom } from "../providers"
import { InputFilter } from "./input-filter"
import { SelectFilter } from "./select-filter"

export function PropertyFilters() {
  const properties = useAtomValue(propertiesOfTagsAtom)
  return (
    <div className="mr-auto flex gap-2">
      {Object.keys(properties).map((property, index) => {
        if (typeof properties[property] === "string") {
          return (
            <InputFilter key={property} property={property} index={index} />
          )
        }
        return (
          <SelectFilter
            key={property}
            property={property}
            index={index}
            propertyValue={properties[property]}
          />
        )
      })}
    </div>
  )
}
