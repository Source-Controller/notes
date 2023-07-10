import { useEffect, useState } from "react"
import { useAtom } from "jotai"

import { Input } from "@/components/ui/input"

import { filtersAtom, tagsAtom } from "../providers"

export function InputFilter(props: any) {
  const { property, index } = props
  const [tags] = useAtom(tagsAtom)

  const [filters, setFilters] = useAtom(filtersAtom)

  const [value, setValue] = useState<string>(property)

  // useEffect(() => {
  //   setFilters((prevFilters) => {
  //     const updatedFilters = {
  //       ...prevFilters,
  //     }
  //     return updatedFilters
  //   })
  // }, [value])

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
