import { useEffect, useState } from "react"
import { useAtom } from "jotai"

import { Input } from "../components/ui/input"
import { filtersAtom, tagsAtom } from "../providers"

export function InputFilter({
  property,
  index,
}: {
  property: string
  index: number
}) {
  const [tags] = useAtom(tagsAtom)

  const [, setFilters] = useAtom(filtersAtom)

  const [value, setValue] = useState<string>("")

  useEffect(() => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [property]: value,
      }
      return updatedFilters
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <Input
      className="max-w-[120px]"
      placeholder={`Filter ${tags.names[index]}...`}
      value={value}
      onChange={handleChange}
    />
  )
}
